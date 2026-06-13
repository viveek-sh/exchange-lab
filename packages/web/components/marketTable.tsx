import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableData } from "@/lib/mockData";

export default function MarketTable() {
  return (
    <div className="mt-6 rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>24h Volume</TableHead>
            <TableHead>Open Interest</TableHead>
            <TableHead>24h Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.name}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.volume}</TableCell>
              <TableCell>{row.oi}</TableCell>
              <TableCell
                className={row.change >= 0 ? "text-green-500" : "text-red-500"}>
                {row.change}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
