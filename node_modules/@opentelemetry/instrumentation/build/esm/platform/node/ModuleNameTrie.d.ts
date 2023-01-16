import type { Hooked } from './RequireInTheMiddleSingleton';
export declare const ModuleNameSeparator = "/";
/**
 * Trie containing nodes that represent a part of a module name (i.e. the parts separated by forward slash)
 */
export declare class ModuleNameTrie {
    private _trie;
    private _counter;
    /**
     * Insert a module hook into the trie
     *
     * @param {Hooked} hook Hook
     */
    insert(hook: Hooked): void;
    /**
     * Search for matching hooks in the trie
     *
     * @param {string} moduleName Module name
     * @param {boolean} maintainInsertionOrder Whether to return the results in insertion order
     * @returns {Hooked[]} Matching hooks
     */
    search(moduleName: string, { maintainInsertionOrder }?: {
        maintainInsertionOrder?: boolean;
    }): Hooked[];
}
//# sourceMappingURL=ModuleNameTrie.d.ts.map