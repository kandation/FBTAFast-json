import {access, mkdir, readFile, writeFile, readFileSync, promises} from "fs";
import {join} from 'path';
import * as _ from 'lodash'

export class FbtaFile {
    static loadConfig(path): Promise<string> {
        return this.loadFile(path)
    }

    static absPath(path: string) {
        return join(__dirname, path)
    }

    static loadFile(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            readFile(path, 'utf8', (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })

    }

    // static isExist(path: string): Promise<any> {
    //     // return promises.access(path).then(value => value).catch(v => false)
    // }

    static loadJson(jsonPath: string): Promise<any> {
        return new Promise((resolve) => {
            FbtaFile.loadFile(jsonPath).then(data => {
                let ck = FbtaFile.isJson(data)
                if (ck) resolve(ck)
            })
        })
    }

    static isJson(data: string) {
        try {
            return (JSON.parse(data))
        } catch (e) {
            return false
        }
    }

    static writeJson(path,json: object) {
        let myJson = JSON.stringify(json)
        writeFile(FbtaFile.absPath(path), myJson,'utf8',_.noop)
    }
}