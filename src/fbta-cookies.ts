import {FbtaFile} from "./fbta-file"
import {FBTAConfig} from "./fbta-config"

export class FbtaCookies {
    private conf: FBTAConfig
    private fbtaFile: Promise<string>
    private _cookies: object

    constructor(_conf: FBTAConfig) {
        this.conf = _conf
        this._cookies = []
    }


    public getCookiesFromFile() {
        return this._loadJson2Cookies()
    }


    private async  _loadJson2Cookies() {
        return await FbtaFile.loadJson(this.conf.getCookieFilePath()).then(js => {
            return this._cookieCleanSameSite(js)
        }).catch(reason => {
            // When not has cookies file or Error. Send signal call parent Node
            console.warn(reason)
            return []
        })
    }

    private _cookieCleanSameSite(js: any) {
        for (let i = 0; i < js.length; i++) {
            delete js[i]['sameSite']
        }
        return js
    }

    writeCookie(json: object) {
        FbtaFile.createTargetFile(this.conf.getConfigFilePath())
        FbtaFile.writeJson(this.conf.getCookieFilePath(), json)
    }
}