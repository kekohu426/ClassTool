// Chart components wrapper for recharts
import * as React from "react";

// These are re-exports from recharts but simplified for our needs
export { 
  BarChart, 
  LineChart, 
  PieChart, 
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  Line,
  Area,
  Pie,
  Cell
} from "recharts@2.13.3";

// Chart container component
export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));