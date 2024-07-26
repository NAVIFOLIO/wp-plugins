(function(){
    var el = wp.element.createElement;
    var RichText = wp.blockEditor.RichText;
    
    wp.blocks.registerBlockType(
        'gutenberg-custom-blocks/download-btn',
        {
            title: 'カスタムダウンロードボタン',
            icon: 'download',
            description: 'ダウンロード完了と同期するダウンロードボタン',
            category: 'media',
            example: {},
            attributes: {
                url: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'a',
                    attribute: 'data-url'
                }
            },
            edit: function(props){
                return el(
                        RichText,
                        {
                            tagName: 'a',
                            value: props.attributes.url,
                            placeholder: 'ダウンロードファイルのURLを入力',
                            onChange: function(newURL){
                                props.setAttributes({url: newURL});
                            }
                        }
                );
            },
            save: function(props){
                return el(
                    'a',
                    {
                        className: 'download_btn',
                        'data-url': props.attributes.url
                    },
                    [
                        el(
                            'i',
                            {
                                className: 'fa-solid fa-download fa-bounce',
                                style: {
                                    color: 'white'
                                }
                            }
                        ),
                        'Download'
                    ]
                );
            }
        }
    );
}(wp));