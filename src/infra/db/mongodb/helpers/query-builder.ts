export class QueryBuilder {
  private readonly query = []

  private addStep (step: string, data: object): QueryBuilder {
    this.query.push({
      [step]: data
    })
    return this
  }

  group (data: object): QueryBuilder {
    return this.addStep('$group', data)
  }

  project (data: object): QueryBuilder {
    return this.addStep('$project', data)
  }

  build (): object[] {
    return this.query
  }
}
