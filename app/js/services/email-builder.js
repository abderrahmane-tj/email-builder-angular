angular.module('emailApp.services')
.factory('emailBuilder', ['$http','$q','obj2css',function ($http, $q,obj2css) {
    var service = {
        loaded: false,
        run: run
    };
    var pageData;

    var pageTemplate;
    var sectionTemplate;
    var columnTemplate;
    var elementTemplate;

    getTemplates().then(function (response) {
        pageTemplate = response[0].data;
        sectionTemplate = response[1].data;
        columnTemplate = response[2].data;
        elementTemplate = response[3].data;
    });
    function run(data){
        pageData = data;
        return buildPage(data);
    }
    function buildPage(pageData){
        var sectionsHTML = pageData.sections.map(buildSection);

        var pageParams = {
            sections: sectionsHTML.join("\n"),
            customStyles: '<style>\n  html, table.body{background-color:'+pageData.style['background-color']+';}\n  body{'+obj2css(pageData.style)+'}\n</style>'
        };
        var html = supplant(pageTemplate,pageParams);

        return [html, pageParams];
    }
    function buildSection(sectionData){
        var columnsHTML = sectionData.columns.map(buildColumn);

        var sectionWrapperStyle = obj2css(sectionData.wrapper.style);
        var sectionStyle = obj2css(sectionData.style);

        var html = supplant(sectionTemplate,{
            sectionWrapperStyle: sectionWrapperStyle,
            sectionStyle: sectionStyle,
            columns: columnsHTML.join("\n")
        });

        return html;
    }
    function buildColumn(columnData, index, array){
        var elementsHTML = columnData.elements.map(buildElement);
        var columnClasses = [];
        if(index === 0){ columnClasses.push('first'); }
        if(index === array.length-1){ columnClasses.push('last'); }
        if(columnData['no-padding']){ columnClasses.push('no-padding'); }

        var columnStyle = obj2css(columnData.style);

        var html = supplant(columnTemplate,{
            gridWidth: columnData['grid-width'],
            columnClasses: columnClasses.join(' '),
            columnStyle: columnStyle,
            elements: elementsHTML.join("\n")
        });

        return html;
    }
    function buildElement(elementData){
        var elementHTML;
        switch (elementData.type){
            case "text": elementHTML = buildText(elementData); break;
            case "image": elementHTML = buildImage(elementData); break;
            case "button": elementHTML = buildButton(elementData); break;
            case "divider": elementHTML = buildDivider(elementData); break;
            case "spacer": elementHTML = buildSpacer(elementData); break;
        }
        var elementStyle = obj2css(elementData.style);
        return supplant(elementTemplate, {
            element:elementHTML,
            elementStyle: elementStyle
        });
    }
    function buildText(data){
        return data.content;
    }
    function buildImage(data){
        var classes = {
            left: 'float-left',
            center: 'float-center',
            right: 'float-right'
        };
        var html = "<img src='{src}' alt='' {alignAttribute} class='{classes}'>";
        var link = "<a href='{link}'>{element}</a>";
        var wrapper = "<center>{element}</center>";

        html = supplant(html,{
            src: data.src,
            classes: classes[data.alignment],
            alignAttribute: classes[data.alignment] === 'center' ? 'align="center"' : ''
        });

        if(data.link){
            html = supplant(link,{element: html, link: data.link});
        }

        if(data.alignment === 'center'){
            html = supplant(wrapper,{element: html});
        }

        return html;
    }
    function buildButton(data){
        var htmlClasses = '';
        var classes = {
            text: {
                center: 'text-align-center',
                left: 'text-align-left',
                right: 'text-align-right'
            },
            button:{
                center: 'button-align-center',
                left: 'button-align-left',
                right: 'button-align-right'
            }
        };

        var html = "<table class='button {buttonClasses}'><tr><td><table><tr><td>{buttonText}</td></tr></table></td></tr></table>";
        var buttonText = "<a class='{textClasses}' {alignAttribute} href='{url}'>{text}</a>";
        var wrapper = "<center>{element}</center>";

        buttonText = supplant(buttonText,{
            textClasses: classes.text[data.textAlignment],
            alignAttribute: data.expanded ? 'align="center"' : '',
            url: data.url,
            text: data.text
        });

        if(data.buttonAlignment === 'center'){
            buttonText = supplant(wrapper,{element: buttonText});
        }

        var buttonClasses = [data.sizing, data.coloring, classes.button[data.buttonAlignment]];
        if(data.expanded){
            buttonClasses.push('expanded');
        }
        html = supplant(html,{
            buttonClasses: buttonClasses.join(' '),
            buttonText: buttonText
        });

        return html
    }
    function buildDivider(data){
        return "<div class='divider'><hr></div>";
    }
    function buildSpacer(data){
        var html = "<table class='spacer'><tbody><tr><td height='{height}px' style='font-size:{height}px; line-height:{height}px;'>&#xA0;</td></tr></tbody></table>";
        html = supplant(html,{height: data.height});
        return html;
    }
    function getTemplates(){
        return $q.all([
            $http.get(
                'app/templates/parts/export/page.template.html',
                {cache:false}
            ),
            $http.get(
                'app/templates/parts/export/section.template.html',
                {cache:false}
            ),
            $http.get(
                'app/templates/parts/export/column.template.html',
                {cache:false}
            ),
            $http.get(
                'app/templates/parts/export/element.template.html',
                {cache:false}
            )
        ]);
    }
    function supplant (s,o) {
        return s.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string'
                || typeof r === 'number' ? r : a;
            }
        );
    }
    return service;
}]);