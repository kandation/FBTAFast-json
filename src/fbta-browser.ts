import * as fs from "fs"
import * as path from 'path';
import * as webdriver from "selenium-webdriver"
import {path as chrome_path} from "chromedriver"
import {ServiceBuilder, Options, setDefaultService} from "selenium-webdriver/chrome"
import {FBTAConfig} from "./fbta-config";

export class FbtaBrowserSelenium {
    private username: string;
    private password: string;
    public driver: webdriver.ThenableWebDriver;
    private _conf: FBTAConfig

    constructor(conf: FBTAConfig) {
        this.username = ''
        this.password = ''
        this._conf = conf
    }

    public initDriver(): Promise<any> {
        return new Promise(resolve => {
            let service = new ServiceBuilder(chrome_path).build()
            setDefaultService(service);

            this.driver = new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.chrome())
                .forBrowser('chrome')
                .build();
            console.log('Start Sel driver')
            resolve()
        })
    }

    public setChromeOptions() {
        return new Promise(resolve => {
            let chromeOptions;
            chromeOptions = new Options();
            chromeOptions.addArguments('-disable-javascript')
            console.log('chromeOPtions')
            resolve(chromeOptions)
        })

    }

    public loadCookies(): Promise<any> {
        return new Promise(resolve => {
            try {
                let file_data = fs.readFileSync(path.join(__dirname, './sync/cookies.json'), {encoding: 'utf8'})
                let js = JSON.parse(file_data)
            } catch (e) {

            }
            this.driver.get('https://www.google.com').then(res => {
                console.log(this.driver.getTitle())
            })
        })
    }
}