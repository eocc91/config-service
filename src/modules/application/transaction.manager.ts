export abstract class TransactionManager {
    abstract execute<T>(operation: (transactionalEntityManager: any) => Promise<T>): Promise<T>;
  }