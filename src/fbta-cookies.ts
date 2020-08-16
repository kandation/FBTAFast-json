import {FbtaFile} from "./fbta-file"
import {FBTAConfig} from "./fbta-config"

export class FbtaCookies {
    private conf: FBTAConfig
    private fbtaFile: Promise<string>

    constructor(_conf: FBTAConfig) {
        this.conf = _conf
    }

    public getCookies() {
        return this._loadJson2Cookies()
    }


    private _loadJson2Cookies() {
        return FbtaFile.loadJson(this.conf.getConfigFilePath()).then(js=>{
            let lx = this._cookieCleanSameSite(js)
            console.log('-----------', js, lx)
        }).catch(reason => {
            // When not has cookies file or Error. Send signal call parent Node
            console.warn(reason)
        })
    }

    private _cookieCleanSameSite(js:any){
        for (let i=0;i<js.length;i++){
            delete js[i]['sameSite']
            for (let key in js[i]){
                console.log(js[i][key])
            }
        }
        return js
    }
}