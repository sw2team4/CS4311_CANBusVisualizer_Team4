from flask import Flask, redirect, request
from flask_cors import CORS
import subprocess
from flask import  Blueprint


syncronizer = Blueprint('syncronizer', __name__)
CORS(syncronizer)

@syncronizer.route("/sync",methods=["POST", "GET"])
def sync():
    src_data = request.form.get("srcdata_")
    dest_ip = request.form.get("ip_")
    dest_un = request.form.get("un_")
    dest_pw = request.form.get("pw_")
    dest_fldr = request.form.get("destfldr_")

    return subprocess.run(['./rsync.sh', src_data, dest_ip,dest_un,dest_pw,dest_fldr], shell=False)