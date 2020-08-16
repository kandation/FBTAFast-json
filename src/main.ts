import {FbtaBrowserSelenium} from "./fbta-browser"
import {FBTAConfig} from "./fbta-config"
import {FbtaCookies} from "./fbta-cookies";
import {FbtaParent} from "./fbta-parent";
import {FbtaFile} from "./fbta-file";

const {0: ENV_USERNAME, 1: ENV_PASSWORD} = process.env.FBTA_CODE_USER_1.toString().split(';')

let config: FBTAConfig
let cookies: FbtaCookies


FbtaFile.createTargetFile('../Data/s/')
// config = new FBTAConfig(ENV_USERNAME)
// config.setPassword(ENV_PASSWORD)
// config.setConfigFilePath('../Data/cookies.json')
//
// x()
//
// let bw = new FbtaParent(config)
// bw.loadParent().then(value => {
//     bw.runFBLoginGUI().then()
// })
//
//
// async function x() {
//     let a = cookies.getCookies()
// }



