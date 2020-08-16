import {access, mkdir, readFile, writeFile} from "fs";
import * as _ from "lodash";
import {FbtaFile} from "./fbta-file";

enum DirNameDetailOptions {
    HHMMSS,
    HHMM
}

enum UsernameSourceOptions {
    ENV_PATH,
    FILE_PATH,
    STATIC
}

export interface IConfigProps {
    headless: boolean
    dirSavePrefix: string
    dirSavePath: string
    dirNewNameOption: DirNameDetailOptions
    clusterNums: number
    dbPrefix: string
    dbName: string
    flowResume: boolean
    usernameSource: UsernameSourceOptions
    dataPath: string
    configFilePath: string
    cookieFileName: string
}

export interface IUser {
    username: string
    username_hash: string
    password: string
    name: string | null
    fbid: string | null
}

interface ISequenceDescription {
    description: string
    currentStep: number
    runDate: string
}


export class FBTAConfig {
    private conf: IConfigProps
    private logDesc: object
    private _user: IUser

    constructor(username: string) {
        this.loadVar()
        this._user = {
            username: username,
            username_hash: this._usernameHash(username),
            password: '',
            name: '',
            fbid: ''
        }
    }

    getDataPath() {
        return `${this.conf.dataPath}/${this._user.username_hash}`
    }

    public getConfigFilePath(): string {
        return `${this.getDataPath}/${this.conf.configFilePath}`
    }

    public setConfigFilePath(path: string) {
        this.conf.configFilePath = path
    }

    // public set configFilePath(path) {
    //     FbtaFile.isExist(path).then((d)=>{
    //         console.log(d)})
    //     access(path, err => {
    //         if (err) {
    //             this.configFileCreateIfNone()
    //         }
    //     })
    //     this.conf.configFilePath = path
    // }

    private _usernameHash(data: string) {
        let crypto = require('crypto');
        return crypto.createHash('md5').update(data).digest("hex");
    }

    private _checkConfigFileAndCreate() {
        // FbtaFile.isExist(this.getConfigFilePath(),err=>{
        //     FbtaFile.writeJson()
        // })


    }

    public loadVar() {
        this.conf = {
            headless: true,
            dirSavePrefix: 'save_',
            dirSavePath: '.',
            dirNewNameOption: DirNameDetailOptions.HHMMSS,
            clusterNums: 1,
            dbPrefix: 'fbta_',
            dbName: null,
            flowResume: true,
            usernameSource: UsernameSourceOptions.ENV_PATH,
            dataPath: '../Data',
            configFilePath: 'fbta_config.json',
            cookieFileName: 'fbta_cookies.json'
        }

        this.logDesc = {
            description: '',
        }

        // console.log(_.keys(this.conf))
        // console.log(this.conf['flowResume-1'])
        // console.log(new Date().toISOString())
    }

    public getDefaultConfig() {

    }

    private configFileCreateIfNone() {
        mkdir('Data', _.noop)
        writeFile('./Data/fbta_config.json', '123123', 'utf8', _.noop)

    }

    public LoadConfigFile(config_path: string) {
        return new Promise(resolve => {
            readFile(config_path, 'utf8', (err, data) => {
                return data
            })
        })


    }

    setPassword(pwd: string) {
        this._user.password = pwd
    }

    getPassword(): string {
        return this._user.password
    }

    getUsername(): string {
        return this._user.username
    }

    getCookieFilePath() {
        return this._user.username
    }
}

