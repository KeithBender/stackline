const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

export const aggregateByMonth = (salesData: any[]) => {
  const monthlyData: { [key: string]: { retailSales: number, wholesaleSales: number } } = {};

  salesData.forEach(sale => {
    const date = new Date(sale.weekEnding);
    const month = `${date.getFullYear()}-${date.getMonth()}`;

    if (!monthlyData[month]) {
      monthlyData[month] = { retailSales: 0, wholesaleSales: 0 };
    }

    monthlyData[month].retailSales += sale.retailSales;
    monthlyData[month].wholesaleSales += sale.wholesaleSales;
  });

  return Object.entries(monthlyData).map(([month, sales]) => {
    const [year, monthIndex] = month.split('-');
    return {
      month: `${monthNames[parseInt(monthIndex)]} ${year}`,
      retailSales: sales.retailSales,
      wholesaleSales: sales.wholesaleSales,
    };
  });
};
