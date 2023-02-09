export const nCardGroups = 3
export const nCardsPerGroup = 7

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export class VoteProvider {
  constructor() {
    const cardsKeys = Array(nCardGroups)
      .fill()
      .flatMap((_, group) =>
        Array(nCardsPerGroup)
          .fill()
          .map((_, card) => `${group}-${card}`)
      )
    this.mockedVotes = {}
    cardsKeys.forEach(cardKey => {
        const votes = Math.floor(Math.random() * 42)
        this.mockedVotes[cardKey] = votes
    })
  }

  async getVotes() {
    return this.mockedVotes
  }

  async vote(cardKey) {
    await sleep(1000)
    this.mockedVotes[cardKey]++
    return this.mockedVotes
  }
}
