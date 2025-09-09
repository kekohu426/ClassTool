import { Hono } from "https://deno.land/x/hono@v4.6.14/mod.ts";
import { cors } from "https://deno.land/x/hono@v4.6.14/middleware.ts";
import { logger } from "https://deno.land/x/hono@v4.6.14/middleware.ts";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-2e166dbc/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all students
app.get("/make-server-2e166dbc/students", async (c) => {
  try {
    const students = await kv.get("classroom_students") || [];
    const groupOrder = await kv.get("classroom_group_order") || [];
    return c.json({ students, groupOrder });
  } catch (error) {
    console.log("Error fetching students:", error);
    return c.json({ error: "Failed to fetch students" }, 500);
  }
});

// Save students data
app.post("/make-server-2e166dbc/students", async (c) => {
  try {
    const { students, groupOrder } = await c.req.json();
    await kv.set("classroom_students", students);
    if (groupOrder) {
      await kv.set("classroom_group_order", groupOrder);
    }
    return c.json({ success: true });
  } catch (error) {
    console.log("Error saving students:", error);
    return c.json({ error: "Failed to save students" }, 500);
  }
});

// Update student points
app.put("/make-server-2e166dbc/students/:id/points", async (c) => {
  try {
    const studentId = c.req.param("id");
    const { points } = await c.req.json();
    
    const students = await kv.get("classroom_students") || [];
    const studentIndex = students.findIndex((s: any) => s.id === studentId);
    
    if (studentIndex === -1) {
      return c.json({ error: "Student not found" }, 404);
    }
    
    const oldPoints = students[studentIndex].points;
    students[studentIndex].points += points;
    students[studentIndex].interactionCount += 1;
    
    await kv.set("classroom_students", students);
    
    return c.json({ 
      success: true, 
      student: students[studentIndex],
      oldPoints,
      newPoints: students[studentIndex].points
    });
  } catch (error) {
    console.log("Error updating student points:", error);
    return c.json({ error: "Failed to update points" }, 500);
  }
});

// Update student homework
app.put("/make-server-2e166dbc/students/:id/homework", async (c) => {
  try {
    const studentId = c.req.param("id");
    
    const students = await kv.get("classroom_students") || [];
    const studentIndex = students.findIndex((s: any) => s.id === studentId);
    
    if (studentIndex === -1) {
      return c.json({ error: "Student not found" }, 404);
    }
    
    students[studentIndex].homeworkCount += 1;
    
    await kv.set("classroom_students", students);
    
    return c.json({ 
      success: true, 
      student: students[studentIndex]
    });
  } catch (error) {
    console.log("Error updating student homework:", error);
    return c.json({ error: "Failed to update homework" }, 500);
  }
});

// Update student group
app.put("/make-server-2e166dbc/students/:id/group", async (c) => {
  try {
    const studentId = c.req.param("id");
    const { group } = await c.req.json();
    
    const students = await kv.get("classroom_students") || [];
    const studentIndex = students.findIndex((s: any) => s.id === studentId);
    
    if (studentIndex === -1) {
      return c.json({ error: "Student not found" }, 404);
    }
    
    students[studentIndex].group = group;
    
    await kv.set("classroom_students", students);
    
    return c.json({ 
      success: true, 
      student: students[studentIndex]
    });
  } catch (error) {
    console.log("Error updating student group:", error);
    return c.json({ error: "Failed to update group" }, 500);
  }
});

// Update group name
app.put("/make-server-2e166dbc/groups/:oldName", async (c) => {
  try {
    const oldName = c.req.param("oldName");
    const { newName } = await c.req.json();
    
    const students = await kv.get("classroom_students") || [];
    
    // Update all students with the old group name
    const updatedStudents = students.map((student: any) => {
      if (student.group === oldName) {
        return { ...student, group: newName };
      }
      return student;
    });
    
    await kv.set("classroom_students", updatedStudents);
    
    return c.json({ 
      success: true, 
      updatedCount: updatedStudents.filter((s: any) => s.group === newName).length
    });
  } catch (error) {
    console.log("Error updating group name:", error);
    return c.json({ error: "Failed to update group name" }, 500);
  }
});

// Reset all data
app.delete("/make-server-2e166dbc/reset", async (c) => {
  try {
    await kv.del("classroom_students");
    await kv.del("classroom_group_order");
    return c.json({ success: true });
  } catch (error) {
    console.log("Error resetting data:", error);
    return c.json({ error: "Failed to reset data" }, 500);
  }
});

Deno.serve(app.fetch);