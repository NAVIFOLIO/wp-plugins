(function(){
    var el = wp.element.createElement;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var RichText = wp.blockEditor.RichText;
    
    wp.blocks.registerBlockType(
        'gutenberg-custom-blocks/colab-link-card',
        {
            title: 'Google Colabリンク',
            icon: 'cloud',
            description: 'Colab Notebookへのリンクカード',
            category: 'text',
            example: {},
            attributes: {
                card_title: {
                    type: 'text',
                    source: 'text',
                    selector: '.colab-link-title'
                },
                card_description: {
                    type: 'text',
                    source: 'text',
                    selector: '.colab-link-summary'
                },
                url: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'a.colab-link',
                    attribute: 'href'    
                }
            },
            edit: function(props){
                return el(
                    'div',
                    {
                        className: 'colab-link-edit-area'
                    },
                    [
                        el(
                            RichText,
                            {
                                tagName: 'p',
                                value: props.attributes.card_title,
                                placeholder: 'Colabノートブックタイトルを入力',
                                onChange: function(newTitle){
                                    props.setAttributes({card_title: newTitle});
                                }
                            }
                        ),
                        el(
                            RichText,
                            {
                                tagName: 'p',
                                value: props.attributes.card_description,
                                placeholder: 'ノートブックの要約を入力',
                                onChange: function(newDescription){
                                    props.setAttributes({card_description: newDescription});
                                }
                            }
                        ),
                        el(
                            RichText,
                            {
                                tagName: 'p',
                                value: props.attributes.url,
                                placeholder: 'ノートブックURLを入力', 
                                onChange: function(newURL){
                                    props.setAttributes({url: newURL});
                                }
                            }
                        )
                    ] 
                );
            },
            save: function(props){
                var blockProps = useBlockProps.save({className: 'colab-link-card'});
                return el(
                    'div',
                    blockProps,
                        [
                            el(
                                'a',
                            {
                                className: 'colab-link',
                                href: props.attributes.url
                            }
                            ),
                        
                            el(
                                RichText.Content,
                                {
                                    tagName: 'div',
                                    className: 'colab-link-title',
                                    value: props.attributes.card_title
                                }
                            ),
                            el(
                                RichText.Content,
                                {
                                    tagName: 'div',
                                    className: 'colab-link-summary',
                                    value: props.attributes.card_description
                                }
                            )
                        ]
                );
            }
        }
    );
}(wp));