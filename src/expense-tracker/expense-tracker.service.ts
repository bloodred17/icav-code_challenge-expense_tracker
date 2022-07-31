import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';
import { ExpenseCategory, Receipt } from './receipt.schema';

export type DateRange = { startDate: Date; endDate: Date };

@Injectable()
export class ExpenseTrackerService {
  async getTotalCostCsv(option?: DateRange) {
    const receipts = !option
      ? await Receipt.model.find({})
      : await Receipt.model.find({
          time: {
            $gte: option?.startDate?.toISOString(),
            $lt: option?.endDate?.toISOString(),
          },
        });

    const workbook = new ExcelJS.Workbook();

    workbook.creator = 'Ankur';
    workbook.created = new Date();

    const title = 'Total cost percentage';
    const worksheet = workbook.addWorksheet(title, {
      headerFooter: { firstHeader: title },
    });

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Title', key: 'title', width: 32 },
      { header: 'Cost', key: 'cost', width: 10, outlineLevel: 1 },
      { header: 'Category', key: 'category', width: 10 },
      { header: 'Time', key: 'time', width: 10 },
      { header: 'Percentage', key: 'percentage', width: 10 },
    ];

    const totalCost = receipts
      ?.map((receipt) => receipt?.cost)
      ?.reduce((acc, cost) => (acc += cost));
    for (const receipt of receipts) {
      worksheet.addRow({
        id: receipt?._id,
        title: receipt?.title,
        cost: receipt?.cost,
        time: receipt?.time,
        category: receipt?.category,
        percentage: (receipt?.cost / totalCost) * 100,
      });
    }
    const lastRowCount = worksheet.rowCount + 1;
    const lastRow = worksheet.getRow(lastRowCount);
    lastRow.getCell(2).value = 'Total Cost: ';
    lastRow.getCell(3).value = totalCost;
    lastRow.outlineLevel = 1;

    const filename = title?.toLowerCase()?.replace(/\s/gi, '_');
    await workbook.csv.writeFile(`./temp/${filename}.csv`);
    return filename;
  }

  async getPercentageByCategory(option?: DateRange) {
    const receipts = !option
      ? await Receipt.model.find({})
      : await Receipt.model.find({
          time: {
            $gte: option?.startDate?.toISOString(),
            $lt: option?.endDate?.toISOString(),
          },
        });

    const workbook = new ExcelJS.Workbook();

    workbook.creator = 'Ankur';
    workbook.created = new Date();

    const title = 'Total category percentage';
    const worksheet = workbook.addWorksheet(title, {
      headerFooter: { firstHeader: title },
    });

    worksheet.columns = Object.values(ExpenseCategory)?.map((category) => ({
      header: category,
      key: category?.toLowerCase(),
      width: 10,
    }));

    let totalByCategory: Record<ExpenseCategory, number>;
    Object.values(ExpenseCategory)?.forEach((categoryValue) => {
      const entry = { [categoryValue]: 0 };
      totalByCategory = { ...totalByCategory, ...entry };
    });

    totalByCategory = receipts
      ?.map((receipt) => ({ cost: receipt?.cost, category: receipt?.category }))
      ?.reduce((acc, item) => {
        acc[item?.category] += item?.cost;
        return acc;
      }, totalByCategory);

    const totalCost = Object.values(totalByCategory)?.reduce(
      (acc, item) => (acc += item),
    );

    const lastRowCount = worksheet.rowCount + 1;
    const lastRow = worksheet.getRow(lastRowCount);
    Object.entries(totalByCategory)?.forEach(([key, value], index) => {
      lastRow.getCell(key?.toLowerCase()).value = (value / totalCost) * 100;
    });

    worksheet.columns.forEach((col) => {
      col.numFmt = '0.00%';
    });

    const filename = title?.toLowerCase()?.replace(/\s/gi, '_');
    await workbook.csv.writeFile(`./temp/${filename}.csv`);
    return filename;
  }

  getReceipts(filter: any): Promise<Receipt[]> {
    return Receipt.model.find(filter) as unknown as Promise<Receipt[]>;
  }
}
