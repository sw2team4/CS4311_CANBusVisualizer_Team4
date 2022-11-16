from flask import Flask, redirect, request, Blueprint
from flask_cors import CORS
import subprocess


syncronizer = Blueprint('syncronizer', __name__)
CORS(syncronizer)

@syncronizer.route("/sync", methods=["POST", "GET"])
def sync():
    src_data = request.form.get("source-data")
    dest_ip = request.form.get("ip-address")
    dest_un = request.form.get("username")
    dest_pw = request.form.get("password")
    dest_fldr = request.form.get("dest-data")

    subprocess.run(['./rsync.sh', src_data, dest_ip, dest_un, dest_pw, dest_fldr], shell=False)
    return redirect('http://localhost:3000/')