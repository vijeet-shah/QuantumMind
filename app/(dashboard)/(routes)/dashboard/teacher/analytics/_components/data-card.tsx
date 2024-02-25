import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/priceFormat";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

export const DataCard = ({ label, value, shouldFormat }: DataCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">{label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-3xl">
            {shouldFormat ? formatPrice(value) : value}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
