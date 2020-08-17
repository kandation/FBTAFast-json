import {FbtaFile} from "./fbta-file"
import {FBTAConfig} from "./fbta-config"
import {keys} from 'lodash'

function _cookieCleanSameSite(js: any) {
    for (let i = 0; i < js.length; i++) {
        if (keys(js[i]).indexOf('sameSite'))
            delete js[i]['sameSite']
    }
    return js
}

export class FbtaCookies {
    private conf: FBTAConfig
    private _cookies: Array<Object>

    constructor(_conf: FBTAConfig) {
        this.conf = _conf
        this._cookies = []
    }


    public async getCookiesFromFile() {
        this._cookies = await this._loadJson2Cookies()
        return this._loadJson2Cookies()
    }


    private async _loadJson2Cookies() {
        try {
            let x = await FbtaFile.loadJson(this.conf.getCookieFilePath())
            return await _cookieCleanSameSite(x)
        } catch (e) {

        }
        return []


        // // When not has cookies file or Error. Send signal call parent Node
        //     // console.warn(reason)
        //     return [{}]
        // }))
    }


    writeCookie(json: object) {
        FbtaFile.createTargetFile(this.conf.getConfigFilePath())
        FbtaFile.writeJson(this.conf.getCookieFilePath(), json)
    }

    getCookies(): Array<Object> {
        return this._cookies
    }
}