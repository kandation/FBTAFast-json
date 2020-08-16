import * as fs from "fs"
import * as path from 'path';
import * as webdriver from "selenium-webdriver"
import {path as chrome_path} from "chromedriver"
import {ServiceBuilder, Options, setDefaultService} from "selenium-webdriver/chrome"

export class FbtaBrowserSelenium {
    private username: string;
    private password: string;
    public driver: webdriver.ThenableWebDriver;

    constructor() {
        this.username = ''
        this.password = ''
    }

    public initDriver():Promise<any> {
        return new Promise(resolve => {
            let service = new ServiceBuilder(chrome_path).build()
            setDefaultService(service);
            this.driver = new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.chrome())
                .forBrowser('chrome')
                .build();
            this.driver.then(v => {
                console.log(this.driver)

            })
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