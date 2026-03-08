export default {
    multipass: true,
    js2svg: { pretty: false, indent: 0 },
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                },
            },
        },
        // sanitze SVGs by removing potentially dangerous elements/attributes
        // remove <style> blocks
        'removeStyleElement',
        // remove <script>, SVG event attributes, inline event handlers, and script-URIs from links
        'removeScripts',
        'removeRasterImages',
        // remove attributes whose value starts with "javascript:" (links, hrefs, xlink:href)
        // The value regex checks for javascript: URI schemes (case-insensitive)
        {
            name: 'removeAttrs',
            params: {
                attrs: ['*:*:^javascript:\\s*:', '*:*:^\\s*data:text/html'], // drop JS URIs and inline HTML data URIs
            },
        },
        {
            name: 'removeAttributesBySelector',
            params: {
                selectors: [
                    // remove href/xlink:href from <a> or <image> elements which may point to tracking resources
                    { selector: 'a', attributes: ['href', 'xlink:href'] },
                    { selector: 'image', attributes: ['href', 'xlink:href'] },
                ],
            },
        },
        // SVGO does not have a built-in remove element by tag
        // plugin: remove any <foreignObject> elements entirely
        {
            name: 'removeForeignObject',
            fn: () => {
                return {
                    element: {
                        enter: (node, parentNode) => {
                            if (!parentNode) return;
                            const nodeName = (node.name || '').toLowerCase();
                            if (nodeName === 'foreignobject') {
                                // remove node from parent's children array
                                parentNode.children = parentNode.children.filter((c) => c !== node);
                            }
                        },
                    },
                };
            },
        },
    ],
};
