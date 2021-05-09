import sha256 from 'crypto-js/sha256';

/**
 * Bearer type
 */
interface Bearer {
  company: string
  name: string
  tel: string
}

/**
 * Payload type
 */
interface Payload {
  manufacturer: string
  model: string
  reference: string
  stage: string
  bearer: Bearer
}

/**
 * Block represent one block in the blockchain
 */
class Block {
  /**
   * Date of creation of the block
   */
  private timestamp: Date

  /**
   * The content of the block described as a payload
   */
  private payload: Payload

  /**
   * Hash created in order to protect the chain from fraudulent abuses
   */
  private hash: string

  /**
   * Hash of the previous block
   */
  private previousHash: string

  constructor(timestamp: Date, payload: Payload, previousHash: string = '') {
    this.timestamp = timestamp
    this.payload = payload
    this.previousHash = previousHash
    this.hash = ''
  }

  /**
   * Set block's hash
   * @param hash the generated hash of the block
   */
  public setHash(hash: string) {
    this.hash = hash
  }

  /**
   * Set previous block's hash
   * @param hash the generated hash of the previous block
   */
   public setPreviousHash(hash: string) {
    this.previousHash = hash
  }

  /**
   * Get timestamp
   */
  public getTimestamp(): string {
    return this.timestamp.toString()
  }

  /**
   * Get Payload
   */
  public getPayload(): string {
    return JSON.stringify(this.payload)
  }

  /**
   * Get hash
   */
   public getHash(): string {
    return this.hash
  }

  /**
   * Get previous hash
   */
  public getPreviousHash(): string {
    return this.previousHash
  }
}

/**
 * The chain is the collection of the blocks
 */
class Chain {
  /**
   * Array of blocks
   */
  private chain: Block[]

  constructor() {
    this.chain = [ this.newGenesisBlock() ]
  }

  /**
   * Create the firs block of the chain
   * @returns void
   */
  private newGenesisBlock() {
    const block = new Block(new Date(), { 
      manufacturer: '',
      model: '',
      reference: '',
      stage: '',
      bearer: {
        company: '',
        name: '',
        tel: ''
      }
    }, '0')
    block.setHash(sha256(block.getTimestamp() + block.getPayload() + block.getPreviousHash()).toString())
    return block
  }

  /**
   * Mine Block
   * @param block the block you want to add to the blockchain
   * @returns the Chain instance
   */
  public mineBlock(block: Block): Chain {
    block.setPreviousHash(this.chain[this.chain.length - 1].getHash())
    block.setHash(sha256(block.getTimestamp() + block.getPayload() + block.getPreviousHash()).toString())
    this.chain.push(block)

    return this
  }

  /**
   * Is Chain Valid ?
   * @returns true if the chain is valid, false if it is not
   */
  public isChainValid() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index]
      const previousBlock = this.chain[index - 1]
      if (currentBlock.getPreviousHash() != previousBlock.getHash()) {
        return false
      }
      if (currentBlock.getHash() != sha256(currentBlock.getTimestamp() + currentBlock.getPayload() + currentBlock.getPreviousHash()).toString()) {
        return false
      }
    }

    return true
  }

  /**
   * Get Chain
   * @returns the content of the chain
   */
  public getChain(): Block[] {
    return this.chain
  }
}

export { Chain, Block, Payload, Bearer }