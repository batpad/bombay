from jinja2 import Template
from glob import glob

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

        html = tpl.render({
            'id': this['id'],
            'title': this['title'],
            'text': open(value).read(),
            'links': links
        })
        outfile_path = "maps/%s.html" % this['id'] 
        outfile = open(outfile_path, "w")
        outfile.write(html)
        outfile.close()