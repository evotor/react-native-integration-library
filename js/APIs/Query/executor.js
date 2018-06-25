import {defaultExecutor} from 'abstract-query-builder'
import {QueryModule} from '../../NativeModules'

const executor = (entityName, outerPrototype) =>
    defaultExecutor(QueryModule.executeQuery, entityName, outerPrototype);

export default executor;