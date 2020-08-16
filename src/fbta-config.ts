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
    configFilePath: string
}

interface ISequenceDescription {
    description: string
    currentStep: number
    runDate: string
}


export class FBTAConfig {
    private conf: IConfigProps
    private logDesc: object

    constructor() {
        this.loadVar()
    }

    public getConfigFilePath(): string {
        return this.conf.configFilePath
    }

    public setConfigFilePath(path: string){
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
            configFilePath: '../Data/fbta_config.json',
        }

        this.logDesc = {
            description: '',

        }

        console.log(_.keys(this.conf))
        console.log(this.conf['flowResume-1'])
        console.log(new Date().toISOString())
    }

    public getDefaultConfig(){

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

}

