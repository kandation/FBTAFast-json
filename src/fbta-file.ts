// import {access, mkdir, readFile, writeFile, readFileSync, promises,existsSync,mkdirSync} from "fs";
// import * as fs from "fs";
import * as fs from 'fs';
import * as pathm from 'path';
import * as _ from 'lodash'

export class FbtaFile {
    static loadConfig(path): Promise<string> {
        return this.loadFile(path)
    }

    static absPath(path: string) {
        return pathm.join(__dirname, path)
    }

    static loadFile(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })

    }

    static createTargetFile(targetDir) {
        let isSlash = targetDir[targetDir.length - 1] === '/'
        let dirname = isSlash ? targetDir : pathm.dirname(targetDir)
        let filename = pathm.basename(targetDir)
        fs.mkdirSync(dirname, {recursive: true})
        if (filename && !isSlash) fs.writeFileSync(targetDir, '', 'utf8')
    }

    static loadJson(jsonPath: string):
        Promise<any> {
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

    static writeJson(path, json: object) {
        let myJson = JSON.stringify(json)
        fs.writeFile(FbtaFile.absPath(path), myJson, 'utf8', _.noop)
    }
}