/**
 * Represents a category in a taxonomy. Can also be used to represent the entire taxonomy.
 */
interface Category {
    /**
     * The name of the category.
     */
    name: string;

    /**
     * The color associated with the category.
     */
    color: string;

    /**
     * A callback function to be executed when the mouse enters the category.
     */
    onMouseEnterCallback: Function;

    /**
     * A callback function to be executed when the mouse leaves the category.
     */
    onMouseExitCallback: Function;

    /**
     * A callback function to be executed when the category is clicked.
     */
    onClickCallback: Function;

    /**
     * An array of child categories.
     */
    children: Category[];
}

/**
 * Represents a flattened taxonomy where each depth level contains an array of categories or a single category.
 */
interface FlattenedTaxonomy {
    /**
     * An object that maps each depth level to an array of categories or a single category.
     * The depth level is represented as a number key, and the value is either an array of Category objects
     * or a single Category object.
     */
    [depth: number]: Category[];
}

export {Category, FlattenedTaxonomy};
