import {FbtaBrowserSelenium} from "./fbta-browser"
import {FBTAConfig} from "./fbta-config"
import {FbtaCookies} from "./fbta-cookies";
// let sele = new FbtaBrowserSelenium();
// sele.initDriver()
// sele.driver.get('https://github.com')


let config: FBTAConfig
let cookies: FbtaCookies

config = new FBTAConfig()
config.setConfigFilePath('../Data/cookies.json')
cookies = new FbtaCookies(config)
x()

async function x() {
    let a = cookies.getCookies()


}



