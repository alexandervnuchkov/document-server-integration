﻿/*
 *
 * (c) Copyright Ascensio System Limited 2010-2016
 *
 * This program is freeware. You can redistribute it and/or modify it under the terms of the GNU 
 * General Public License (GPL) version 3 as published by the Free Software Foundation (https://www.gnu.org/copyleft/gpl.html). 
 * In accordance with Section 7(a) of the GNU GPL its Section 15 shall be amended to the effect that 
 * Ascensio System SIA expressly excludes the warranty of non-infringement of any third-party rights.
 *
 * THIS PROGRAM IS DISTRIBUTED WITHOUT ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR
 * FITNESS FOR A PARTICULAR PURPOSE. For more details, see GNU GPL at https://www.gnu.org/copyleft/gpl.html
 *
 * You can contact Ascensio System SIA by email at sales@onlyoffice.com
 *
 * The interactive user interfaces in modified source and object code versions of ONLYOFFICE must display 
 * Appropriate Legal Notices, as required under Section 5 of the GNU GPL version 3.
 *
 * Pursuant to Section 7 § 3(b) of the GNU GPL you must retain the original ONLYOFFICE logo which contains 
 * relevant author attributions when distributing the software. If the display of the logo in its graphic 
 * form is not reasonably feasible for technical reasons, you must include the words "Powered by ONLYOFFICE" 
 * in every copy of the program you distribute. 
 * Pursuant to Section 7 § 3(e) we decline to grant you any rights under trademark law for use of our trademarks.
 *
*/

function initEditor(docKey, mode, type) {
    //mode for editor
    window.mode = window.mode || mode || "view";
    mode = window.mode;

    //mode for editor
    window.type = window.type || type || "desktop";
    type = window.type;

    //url for document
    window.docUrl = document.getElementById("documentUrl").value;

    //key for chaching and collaborate editing
    window.docKey = window.docKey || docKey || key(docUrl);
    docKey = window.docKey;

    //type for document
    var docType = docUrl.substring(docUrl.lastIndexOf(".") + 1).trim().toLowerCase();
    //type for editor
    var documentType = getDocumentType(docType);

    //creating object editing
    new DocsAPI.DocEditor("placeholder",
        {
            type: type,
            width: (type == "desktop" ? "100%" : undefined),
            height: (type == "desktop" ? "100%" : undefined),
            documentType: documentType,
            document: {
                title: docUrl,
                url: docUrl,
                fileType: docType,
                key: docKey,
                permissions: {
                    edit: true
                }
            },
            editorConfig: {
                mode: mode,
            }
        });
}

function key(k) {
    var result = k.replace(new RegExp("[^0-9-.a-zA-Z_=]", "g"), "_") + (new Date()).getTime();
    return result.substring(result.length - Math.min(result.length, 20));
};

var getDocumentType = function (ext) {
    if (".docx.doc.odt.rtf.txt.html.htm.mht.pdf.djvu.fb2.epub.xps".indexOf(ext) != -1) return "text";
    if (".xls.xlsx.ods.csv".indexOf(ext) != -1) return "spreadsheet";
    if (".pps.ppsx.ppt.pptx.odp".indexOf(ext) != -1) return "presentation";
    return null;
};