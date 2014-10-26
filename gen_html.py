from jinja2 import Template
from glob import glob
import codecs

def do():
    text_files = glob("texts/*.txt")
    links = []
    tpl = Template(open("template.html").read())
    for t in text_files:
        filename = t.replace("texts/", "")
        id = filename.split("_")[0]
        title_arr = filename.replace(".txt", "").split("_")[1:]
        title = " ".join(title_arr)
        text = open(t).read()
        data = {
            'id': id,
            'title': title
        }
        links.append(data)
    for index, value in enumerate(text_files):
        this = links[index]
        print value
        html = tpl.render({
            'id': this['id'],
            'title': this['title'],
            'text': codecs.open(value, encoding='utf-8').read(),
            'links': links
        })
        print html
        outfile_path = "maps/%s.html" % this['id'] 
        outfile = codecs.open(outfile_path, mode="w", encoding="utf-8")
        outfile.write(html)
        outfile.close()