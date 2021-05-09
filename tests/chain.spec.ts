import { Chain, Block } from '../index'

describe('Blockchain', () => {

  test('It should mark the blockchain as valid', () => {
    const autoChain = new Chain()

    const pareChocInFactory = new Block(new Date(), {
      manufacturer: 'Renault',
      model: 'Clio',
      reference: '223454',
      stage: 'Factory',
      bearer: {
        company: 'PSA Industry',
        name: 'Jean-Pierre Daniel',
        tel: '+33654326456'
      }
    })

    const pareChocShipping = new Block(new Date(), {
      manufacturer: 'Renault',
      model: 'Clio',
      reference: '223454',
      stage: 'Shipping',
      bearer: {
        company: '2L Logistics',
        name: 'Paul ROUSSEAU',
        tel: '+3365432649'
      }
    })

    autoChain.mineBlock(pareChocInFactory)
    autoChain.mineBlock(pareChocShipping)
    expect(autoChain.isChainValid()).toBe(true)
  })
})