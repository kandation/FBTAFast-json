import {expect, assert} from "chai"
import {FBTAConfig} from "../src/fbta-config"
import 'mocha';
import {beforeEach} from "mocha";
import {FbtaFile} from "../src/fbta-file";
import {constants} from "os";


let conf: FBTAConfig
beforeEach(() => {
    conf = new FBTAConfig()
})


describe('Config File Test',
    () => {
        it('should return null', function () {
            let x = conf.LoadConfigFile('./Data/fbta_config.json')
            assert.isNotNull(x)
        });
        it('should print error if config path is null', () => {
            expect(() => {
                return conf.configFilePath = './Data/fbta_config.json2'

            }).to.throw()

        })

        it('shoulde show all variable', function () {
            conf.loadVar()
        })
    }
)

describe('Cookies Files Test', () => {
    it('should return Error', () => {
        FbtaFile.loadFile('./Test/no-file-here').then((r)=>{
            throw new Error('Test-Error')
        }).catch(reason => {
            expect(reason).to.throw()
        })

    })

    it('should return cookies Json', () => {
        FbtaFile.loadFile('./Test/fbta-config/fbta-config.json').then((r)=>{
           expect(r).is.string('')
        })



    })
})
