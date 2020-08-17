import {FbtaBrowserSelenium} from "./fbta-browser"
import {FBTAConfig} from "./fbta-config"
import {FbtaCookies} from "./fbta-cookies";
import {FbtaParent} from "./fbta-parent";
import {FbtaFile} from "./fbta-file";

const {0: ENV_USERNAME, 1: ENV_PASSWORD} = process.env.FBTA_CODE_USER_2.toString().split(';')

let config: FBTAConfig
let cookies: FbtaCookies


config = new FBTAConfig(ENV_USERNAME)
config.setPassword(ENV_PASSWORD)

console.log(config.getConfigFilePath())
// x()

let bw = new FbtaParent(config)
bw.loadParent().then(value => {
    bw.runFBInit().then()
})


async function x() {
    let a = cookies.getCookiesFromFile()
}



