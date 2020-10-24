from os import path
import os
import json
import time

def json_output(data):
    return json.dumps(data, sort_keys=True, indent=4, separators=(',', ':'), ensure_ascii=False)

def json_input(path):
    with open(path, 'r') as f:
        return json.load(f)

def mkdir(_path):
    if not path.exists(_path):
        os.makedirs(_path)

def get_timestamp(dt):
    #转换成时间数组
    timeArray = time.strptime(dt, "%Y-%m-%d %H:%M:%S")
    #转换成时间戳
    timestamp = time.mktime(timeArray)
    return int(timestamp)

def output(filename, data):
    with open(filename, 'w') as f:
        f.write(json_output(data))

dist = "../contest_list.json"
pathname = "../data"
contest_list = {}

def dfs(contest_list, pathname, link):
    config_path = path.join(pathname, "config.json") 
    if os.path.isfile(config_path):
        config = json_input(config_path)
        contest_list['config'] = config
        contest_list['link'] = link
    else:
        for _path in os.listdir(pathname):
            contest_list[_path] = {}
            dfs(contest_list[_path], path.join(pathname, _path), path.join(link, _path))
        
def work(contest_list, pathname):
    dfs(contest_list, pathname, '/')
    output(dist, contest_list)

work(contest_list, pathname)