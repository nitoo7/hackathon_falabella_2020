import csv
import sys
import json
import re
from elasticsearch import Elasticsearch
csv.field_size_limit(sys.maxsize)

try:
    es = Elasticsearch(
        ['localhost'],
        port=9200
    )
    print("Connected", es.info())
    with open('FACL_products.csv', 'r') as csvfile:
        spamreader = csv.reader(csvfile, quoting=csv.QUOTE_ALL, skipinitialspace=True)
        for row in spamreader:
            data = {}
            data['skuid'] = row[0]
            data['productId'] = row[1]
            data['brand'] = row[2]
            data['product_name'] = row[3]
            data['gender'] = row[4]
            data['rating'] = row[5]
            data['merchant_category'] = row[6]
            i = 0
            for categoryDataList in row[7].split(','):
                data['category_name_' + str(i)] = categoryDataList.replace('"', '')
                i = i + 1

            data['attr_formato'] = row[8]
            j = 0
            for specialAttr in row[9].split(','):
                specialAttrArr = specialAttr.replace('"', '').split(":")
                if len(specialAttrArr) == 2:
                    sttr = specialAttrArr[0].replace(" ", "_")
                    data["attr_to_specification_" + sttr.lower()] = specialAttrArr[1].strip()
                    j = j + 1
            data['attr_modelo'] = row[10]
            data['attr_tipo'] = row[11]
            data['variant_name'] = row[12]
            data['variant_attr_color_group'] = row[13]
            data['variant_attr_primary_color'] = row[14]
            data['variant_attr_size'] = row[15]
            data['variant_seller_id'] = row[16]
            data['price_normal_default'] = row[17]
            data['variant_image_url'] = row[18]
            data['product_image_url'] = row[19]
            all_product_attributes = row[20]
            for all_product_attribute in all_product_attributes.split(';'):
                comma_seperated_value = all_product_attribute.split(':')
                if len(comma_seperated_value) == 2:
                    l = re.compile("[0-9]+-").split(comma_seperated_value[0])
                    if len(l) == 2:
                        str11 = l[1].replace(' ', '_')
                        str12 = "all_product_attributes" + "." + str11
                        data[str12.lower()] = comma_seperated_value[1].strip()
            jsonData = json.dumps(data, ensure_ascii=False)
            es.index(index='heckethon_similar_product', doc_type='post', id=row[0], body=jsonData)
            print(jsonData)

except Exception as ex:
    print("Error:", ex)

