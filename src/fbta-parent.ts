import {FbtaBrowserSelenium} from './fbta-browser'
import * as webdriver from "selenium-webdriver"
import {FBTAConfig} from "./fbta-config";
import {FbtaFbUrl} from "./fbta-fb-url";
import {FbtaCookies} from "./fbta-cookies";
import {FbtaFile} from "./fbta-file";

export class FbtaParent {
    private _browserSel: FbtaBrowserSelenium
    private _conf: FBTAConfig
    private _cookie: FbtaCookies
    private _cookieData: object

    constructor(conf: FBTAConfig) {
        this._conf = conf
        this._cookie = new FbtaCookies(conf)
        this._cookieData = []
    }


    async loadParent() {
        this._browserSel = new FbtaBrowserSelenium(this._conf);
        await this._browserSel.initDriver()
        await this._browserSel.setChromeOptions()
    }

    async runFBInit() {
        let _checkCookiesFIlePath = FbtaFile.isExist(this._conf.getCookieFilePath())
        console.info(':PARENT: Get Cookies from File', this._conf.getCookieFilePath(), _checkCookiesFIlePath)
        if (_checkCookiesFIlePath) {
            await this._cookie.getCookiesFromFile()
            await this._runFBLoginCookies()
        } else {
            await this._runFBLoginGUI()
        }
    }

    private async _runFBLoginCookies() {
        await this._browserSel.driver.get(FbtaFbUrl.M_URL).then(value => {
            let js: Array<any> = this._cookie.getCookies()
            for (let i = 0; i < this._cookie.getCookies().length; i++) {
                this._browserSel.driver.manage().addCookie(js[i])
            }
        })
        await this._browserSel.driver.manage().addCookie({'name': 'noscript', 'value': '1'})
        await this._browserSel.driver.get(FbtaFbUrl.M_URL)

    }

    private async _runFBLoginGUI() {
        /* when cookies expire or has not */
        await this._browserSel.driver.get(FbtaFbUrl.M_URL)
        await this._browserSel.driver.manage().addCookie({'name': 'noscript', 'value': '1'})
        await this._browserSel.driver.get('https://m.facebook.com').then(() => {
            this._browserSel.driver.getTitle().then(title => {
                console.log(title)
            });
        });

        console.log(this._conf.getUsername(), this._conf.getPassword())
        let lx = await this._browserSel.driver.findElement(webdriver.By.name('email'));
        await lx.sendKeys(this._conf.getUsername());
        let pwd = await this._browserSel.driver.findElement(webdriver.By.name('pass'))
        await pwd.sendKeys(this._conf.getPassword())
        let btn = await this._browserSel.driver.findElement(webdriver.By.name('login'))
        await btn.click()


        await this._browserSel.driver.wait(webdriver.until.elementLocated(webdriver.By.id('m_home_notice'))).then(el => {
            this._browserSel.driver.get(`${FbtaFbUrl.M_URL}/me/allactivity?refid=17`)
            this._browserSel.driver.getCurrentUrl().then(value => {
                console.log(value)
            });
            this._browserSel.driver.manage().getCookies().then(value => {
                this.saveCookie(value)
            })
        })


    }

    async saveCookie(value) {
        this._cookie.writeCookie(value)
    }
}