import json
import base64
import io
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

products = [
    {"id": 1, "category": "Стройматериалы", "name": "Гипсокартон Knauf 12,5 мм", "unit": "лист", "price": 420, "old_price": 490, "article": "KN-GKL-12"},
    {"id": 2, "category": "Стройматериалы", "name": "Цемент М500 ПЦ 50 кг", "unit": "мешок", "price": 380, "old_price": None, "article": "CEM-M500-50"},
    {"id": 3, "category": "Стройматериалы", "name": "Кирпич облицовочный красный", "unit": "шт", "price": 28, "old_price": 32, "article": "BR-RED-250"},
    {"id": 4, "category": "Стройматериалы", "name": "Утеплитель ROCKWOOL Лайт Баттс 50мм", "unit": "уп", "price": 1850, "old_price": None, "article": "RW-LB-50"},
    {"id": 5, "category": "Стройматериалы", "name": "Металлочерепица Grand Line 0,5 мм", "unit": "м²", "price": 680, "old_price": 750, "article": "GL-MT-05"},
    {"id": 6, "category": "Инструмент", "name": "Дрель-шуруповёрт Bosch GSR 180-LI", "unit": "шт", "price": 7490, "old_price": 8900, "article": "BSH-GSR180"},
    {"id": 7, "category": "Электрика", "name": "Кабель ВВГнг-LS 3×2,5 мм²", "unit": "м.п.", "price": 95, "old_price": None, "article": "CBL-VVG-325"},
    {"id": 8, "category": "Финишная отделка", "name": "Плитка керамическая Beton 60×60 см", "unit": "м²", "price": 1290, "old_price": 1490, "article": "TL-BTN-6060"},
    {"id": 9, "category": "Финишная отделка", "name": "Дверь межкомнатная Белая Эмаль 2000×800", "unit": "шт", "price": 8900, "old_price": None, "article": "DR-WHT-2080"},
    {"id": 10, "category": "Сантехника", "name": "Смеситель для ванны Grohe Eurostyle", "unit": "шт", "price": 4650, "old_price": 5200, "article": "GRH-ES-BT"},
    {"id": 11, "category": "Инженерные системы", "name": "Труба полипропиленовая 25 мм PN20", "unit": "м.п.", "price": 68, "old_price": None, "article": "PP-25-PN20"},
    {"id": 12, "category": "Крепёж", "name": "Саморезы универсальные 4×40 (200 шт)", "unit": "уп", "price": 185, "old_price": 210, "article": "SCR-440-200"},
]

def handler(event: dict, context) -> dict:
    """Генерирует Excel-файл с прайс-листом товаров и возвращает его в base64."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Прайс-лист"

    # Стили
    header_fill = PatternFill(start_color="1A1A1A", end_color="1A1A1A", fill_type="solid")
    header_font = Font(color="FFFFFF", bold=True, size=11, name="Arial")
    cat_fill = PatternFill(start_color="F5F5F5", end_color="F5F5F5", fill_type="solid")
    cat_font = Font(bold=True, size=10, name="Arial")
    cell_font = Font(size=10, name="Arial")
    price_font = Font(size=10, bold=True, name="Arial", color="1A1A1A")
    old_price_font = Font(size=9, name="Arial", color="999999", strike=True)
    center = Alignment(horizontal="center", vertical="center")
    left = Alignment(horizontal="left", vertical="center", wrap_text=True)
    thin = Side(style="thin", color="E0E0E0")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)

    # Заголовок документа
    ws.merge_cells("A1:F1")
    title_cell = ws["A1"]
    title_cell.value = "ПРАЙС-ЛИСТ — СтройМаркет"
    title_cell.font = Font(bold=True, size=14, name="Arial", color="1A1A1A")
    title_cell.alignment = center
    title_cell.fill = PatternFill(start_color="F0F0F0", end_color="F0F0F0", fill_type="solid")
    ws.row_dimensions[1].height = 32

    ws.merge_cells("A2:F2")
    ws["A2"].value = "Цены действительны на дату запроса. По вопросам опта — звоните менеджеру."
    ws["A2"].font = Font(size=9, name="Arial", color="777777", italic=True)
    ws["A2"].alignment = center
    ws.row_dimensions[2].height = 18

    # Шапка таблицы
    headers = ["№", "Артикул", "Наименование", "Ед. изм.", "Цена, ₽", "Цена до скидки, ₽"]
    col_widths = [5, 16, 45, 10, 14, 18]

    for col, (h, w) in enumerate(zip(headers, col_widths), start=1):
        cell = ws.cell(row=3, column=col, value=h)
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = center
        cell.border = border
        ws.column_dimensions[get_column_letter(col)].width = w

    ws.row_dimensions[3].height = 22

    # Группировка по категориям
    row = 4
    categories_order = ["Стройматериалы", "Инструмент", "Электрика", "Инженерные системы", "Финишная отделка", "Сантехника", "Крепёж"]
    num = 1

    for cat in categories_order:
        cat_products = [p for p in products if p["category"] == cat]
        if not cat_products:
            continue

        # Строка категории
        ws.merge_cells(f"A{row}:F{row}")
        cat_cell = ws.cell(row=row, column=1, value=f"  {cat.upper()}")
        cat_cell.font = cat_font
        cat_cell.fill = cat_fill
        cat_cell.alignment = left
        cat_cell.border = border
        ws.row_dimensions[row].height = 20
        row += 1

        for p in cat_products:
            ws.cell(row=row, column=1, value=num).font = cell_font
            ws.cell(row=row, column=1).alignment = center
            ws.cell(row=row, column=1).border = border

            ws.cell(row=row, column=2, value=p["article"]).font = cell_font
            ws.cell(row=row, column=2).alignment = center
            ws.cell(row=row, column=2).border = border

            ws.cell(row=row, column=3, value=p["name"]).font = cell_font
            ws.cell(row=row, column=3).alignment = left
            ws.cell(row=row, column=3).border = border

            ws.cell(row=row, column=4, value=p["unit"]).font = cell_font
            ws.cell(row=row, column=4).alignment = center
            ws.cell(row=row, column=4).border = border

            price_cell = ws.cell(row=row, column=5, value=p["price"])
            price_cell.font = price_font
            price_cell.alignment = center
            price_cell.border = border
            price_cell.number_format = '#,##0 ₽'

            old_price_cell = ws.cell(row=row, column=6, value=p["old_price"] if p["old_price"] else "—")
            old_price_cell.font = old_price_font if p["old_price"] else cell_font
            old_price_cell.alignment = center
            old_price_cell.border = border
            if p["old_price"]:
                old_price_cell.number_format = '#,##0 ₽'

            ws.row_dimensions[row].height = 20
            num += 1
            row += 1

    # Итого строка
    ws.merge_cells(f"A{row}:D{row}")
    ws.cell(row=row, column=1, value=f"Итого позиций: {len(products)}").font = Font(bold=True, size=10, name="Arial")
    ws.cell(row=row, column=1).alignment = left
    ws.row_dimensions[row].height = 20

    # Сохраняем в буфер
    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    excel_b64 = base64.b64encode(buf.read()).decode("utf-8")

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="price-list.xlsx"',
        },
        'body': excel_b64,
        'isBase64Encoded': True,
    }
