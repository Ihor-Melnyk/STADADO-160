///// ДД Внесення змін
//
//region updatea data from 1C
function onChangecontractorId(onButtonPush = false) {
  // debugger

  clearCounterparty();
  var conInfo;
  var atr = EdocsApi.getAttributeValue("contractorId");
  if (atr && atr.text) {
    var contrArr = atr.text.split("|");
    if (contrArr.length === 1) {
      conInfo = EdocsApi.getContractorData(contractorId.text);
    } else if (contrArr.length === 2) {
      var edocsGETCONTRACTOR = EdocsApi.runExternalFunction("1C", "edocsGETCONTRACTOR?format=json&CONTRACTORID=" + contrArr[0] + "&CONTRACTORTYPE=" + contrArr[1] + "&MAXRESULTCOUNT=200", null, "get");
      if (edocsGETCONTRACTOR == null || edocsGETCONTRACTOR.data == null) {
        return;
      }
      conInfo = edocsGETCONTRACTOR.data;
    }
    setUpdateWith1C(conInfo);
    if (onButtonPush) setUpdateWith1CSystemAttr(conInfo);
  }
}

function isCheckValue(value) {
  if (value == "CounterpartyNotResident" || value == "CounterpartyKindCustomer" || value == "CounterpartyKindProvider" || value == "CounterpartyCheck" || value == "CheckNeed" || value == "CorporateIncludes") {
    return true;
  }
  return false;
}

function setUpdateWith1C(data) {
  //debugger;
  var val = data.attributes;
  if (val && val.length) {
    // try {
    EdocsApi.setAttributeValue({ code: "CounterpartyTaxNumber", value: val.find(x => x.code == "CounterpartyTaxNumber")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyNotResident", value: val.find(x => x.code == "CounterpartyNotResident")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyKindCustomer", value: val.find(x => x.code == "CounterpartyKindCustomer")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyKindProvider", value: val.find(x => x.code == "CounterpartyKindProvider")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyFeature", value: val.find(x => x.code == "CounterpartyFeature")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyRegion", value: val.find(x => x.code == "CounterpartyRegion")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CorporateIncludes", value: val.find(x => x.code == "CorporateIncludes")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAddress", value: val.find(x => x.code == "CounterpartyAddress")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartySite", value: val.find(x => x.code == "CounterpartySite")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyCheck", value: val.find(x => x.code == "CounterpartyCheck")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyStatus", value: val.find(x => x.code == "CounterpartyStatus")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "AuditDateUntil", value: val.find(x => x.code == "AuditDateUntil")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "AdditionalConditions", value: val.find(x => x.code == "AdditionalConditions")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyNumberAgreement", value: val.find(x => x.code == "CounterpartyNumberAgreement")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyYearLimit", value: val.find(x => x.code == "CounterpartyYearLimit")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartAmount", value: val.find(x => x.code == "CounterpartAmount")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyYearAmount", value: val.find(x => x.code == "CounterpartyYearAmount")?.value, text: null });
  }
  if (data.accounts && data.accounts.length) {
    setAccounsMap(data.accounts);
  }
  if (data.authorisedPersons && data.authorisedPersons.length) {
    setAuthPersonsMap(data.authorisedPersons);
  }
  // } catch (e) {
  //    console.log(e)
  //   throw 'невірні дані'
  // }
  // }
}

function clearCounterparty() {
  //debugger;   add cleaner for block with archiving data
  EdocsApi.setAttributeValue({ code: "CounterpartyAccountKind", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyCurrency", value: null, text: null });
  // EdocsApi.setAttributeValue({code: 'AccountChange', value: null, text: null});//не простовлять
  EdocsApi.setAttributeValue({ code: "CounterpartyTaxNumber", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyNotResident", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyKindCustomer", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyKindProvider", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyFeature", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyRegion", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CorporateIncludes", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyAddress", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartySite", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyCheck", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyStatus", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "AuditDateUntil", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "AdditionalConditions", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyNumberAgreement", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyYearLimit", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartAmount", value: null, text: null });
}

//endregion
//region set Currency and CounterpartyAccountKind
function setAccounsMap(array) {
  debugger;
  mapAccounts = [];

  array.forEach(x => mapAccounts.push({ Number: x.CounterpartyAccount, Currency: x.CounterpartyCurrency, AccountKind: x.CounterpartyAccountKind, Bank: x.CounterpartyBank, MFO: x.CounterpartyMFO }));
  EdocsApi.setAttributeValue({ code: "OrgManagerESign1", value: JSON.stringify(mapAccounts), text: null });
  if (mapAccounts.length > 0) setCurrenAccoundKind(mapAccounts[0].Number);
}

function setCurrenAccoundKind(account) {
  var mapAccounts = EdocsApi.getAttributeValue("OrgManagerESign1").value;
  if (mapAccounts) {
    var obj = JSON.parse(mapAccounts).find(x => x.Number == account);
    if (obj) {
      var Currencies = EdocsApi.getDictionaryData("Currencies").find(x => x.value == obj.Currency);
      if (Currencies) EdocsApi.setAttributeValue({ code: "CounterpartyCurrency", value: Currencies.id, text: Currencies.value, itemCode: Currencies.code });
      EdocsApi.setAttributeValue({ code: "CounterpartyAccount", value: obj.Number, text: null });
      EdocsApi.setAttributeValue({ code: "CounterpartyAccountKind", value: obj.AccountKind, text: null });
      EdocsApi.setAttributeValue({ code: "CounterpartyBank", value: obj.Bank, text: null });
      EdocsApi.setAttributeValue({ code: "CounterpartyMFO", value: obj.MFO, text: null });
    }
  }
}

function onChangeCounterpartyAccount() {
  var CounterpartyAccount = EdocsApi.getAttributeValue("CounterpartyAccount").value;
  if (CounterpartyAccount) {
    setCurrenAccoundKind(CounterpartyAccount);
  } else {
    EdocsApi.setAttributeValue({ code: "CounterpartyAccountKind", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyCurrency", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyBank", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyMFO", value: null, text: null });
  }
}

function actualCounterpartyAndOrg() {
  var OrgEDRPOU = EdocsApi.getAttributeValue("OrgEDRPOU").value;
  OrgEDRPOU = OrgEDRPOU ? OrgEDRPOU : getOrgEDRPOU();
  if (OrgEDRPOU) {
    var data = EdocsApi.getContractorByCode(OrgEDRPOU, "homeOrganization");
    if (data) actualOrganization(data);
  }

  var ContractExtDocId = EdocsApi.getAttributeValue("ContractExtDocId").value;
  if (ContractExtDocId) {
    debugger;
    var data = EdocsApi.runExternalFunction("1C", "edocsGetDoc", { edocsDocId: EdocsApi.getAttributeValue("ContractExtDocId")?.value });
    if (data?.data?.outcontractors[0]) {
      actualContrpaty(data?.data?.outcontractors[0]);
    }
  }
}

function actualOrganization(data) {
  EdocsApi.setAttributeValue({ code: "OrgEDRPOU", value: data.code, text: null });
  EdocsApi.setAttributeValue({ code: "Accountant", value: data.code, text: null });
  EdocsApi.setAttributeValue({ code: "OrgName", value: data.shortName, text: null });
  EdocsApi.setAttributeValue({ code: "OrgFullName", value: data.fullName, text: null });
  EdocsApi.setAttributeValue({ code: "OrgINN", value: data.taxId, text: null });

  EdocsApi.setAttributeValue({ code: "OrgMFO", value: data.accounts[0]?.mfo, text: null });
  EdocsApi.setAttributeValue({ code: "OrgBank", value: data.accounts[0]?.bank, text: null });
  EdocsApi.setAttributeValue({ code: "OrgLegalAddress", value: data.legalAddress, text: null });
  EdocsApi.setAttributeValue({ code: "OrgPostalAddress", value: data.addresses[0]?.address, text: null });
  EdocsApi.setAttributeValue({ code: "Organizationid", value: data.contractorId + "|homeOrganization", text: null });
}

function actualContrpaty(data) {
  if (data.TypeContractorDogovor == "С покупателем") {
    EdocsApi.setAttributeValue({ code: "contractorId", value: data.contractorId + "|creditor", text: null });
  } else if (data.TypeContractorDogovor == "С поставщиком") {
    EdocsApi.setAttributeValue({ code: "contractorId", value: data.contractorId + "|debtor", text: null });
  }

  EdocsApi.setAttributeValue({ code: "CounterpartyTaxNumber", value: data.TaxId, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyNotResident", value: data.CounterpartyNotResident == "true" ? true : false, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyKindCustomer", value: data.CounterpartyKindCustomer == "true" ? true : false, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyKindProvider", value: data.CounterpartyKindProvider == "true" ? true : false, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyFeature", value: data.CounterpartyFeature, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyRegion", value: data.CounterpartyRegion, text: null });
  EdocsApi.setAttributeValue({ code: "CorporateIncludes", value: data.CorporateIncludes == "true" ? true : false, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyAddress", value: data.CounterpartyAddress, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyPostalAddress", value: data.CounterpartyPostalAddress, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyPhone", value: data.CounterpartyPhone, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyEmail", value: data.CounterpartyEmail, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartySite", value: data.CounterpartySite, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyCheck", value: data.CounterpartyCheck == "true" ? true : false, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyStatus", value: data.CounterpartyStatus, text: null });
  EdocsApi.setAttributeValue({ code: "AuditDateUntil", value: data.AuditDateUntil != "" ? new Date(data.AuditDateUntil).toISOString() : null, text: null });
  EdocsApi.setAttributeValue({ code: "AdditionalConditions", value: data.AdditionalConditions, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyNumberAgreement", value: data.CounterpartyNumberAgreement || null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyYearLimit", value: data.CounterpartyYearLimit, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartAmount", value: data.CounterpartAmount || null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyYearAmount", value: data.CounterpartyYearAmount, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyEDRPOU", value: data.code, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyName", value: data.ShortName, text: null });

  if (data.accounts && data.accounts.length) {
    mapAccounts = [];
    data.accounts.forEach(x => mapAccounts.push({ Number: x.CounterpartyAccount, Currency: x.CounterpartyCurrency, AccountKind: x.CounterpartyAccountKind, Bank: x.CounterpartyBank, MFO: x.CounterpartyMFO }));
    EdocsApi.setAttributeValue({ code: "OrgManagerESign1", value: JSON.stringify(mapAccounts), text: null });
  }
  if (data.authorisedPersons && data.authorisedPersons.length) {
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthorizedPerson1", value: data.authorisedPersons[0].FullName, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthPersPosition", value: data.authorisedPersons[0].Position, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthPersPhone", value: data.authorisedPersons[0].CounterpartyAuthPersPhone, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthPersEmail", value: data.authorisedPersons[0].CounterpartyAuthPersEmail, text: null });
  }
}
function getOrgEDRPOU() {
  switch (EdocsApi.getAttributeValue("Organizationid").value) {
    case "000000004":
      return "39071152";
    case "000000002":
      return "35942229";
    case "000000013":
      return "32110540";
    default:
      return null;
  }
}

//endregion
//region set CounterpartyAuthPersPhone and CounterpartyAuthPersEmail
var mapAuthPersons = null;

function setAuthPersonsMap(array) {
  var dataAuthPersonMap = EdocsApi.getAttributeValue("DataAuthPersonMap");
  if (!(array && array.length)) {
    dataAuthPersonMap.value = null;
  } else {
    mapAuthPersons = new Map();
    array.forEach(x => mapAuthPersons.set(x.FullName, [x.CounterpartyAuthPersEmail, x.CounterpartyAuthPersPhone]));
    dataAuthPersonMap.value = JSON.stringify(Object.fromEntries(mapAuthPersons));
  }
  safeChangAttr(dataAuthPersonMap);
}

function setAuthorizedPersonPhoneEmail(person) {
  // debugger;
  var counterpartyAuthPersPhone = EdocsApi.getAttributeValue("CounterpartyAuthPersPhone");
  var counterpartyAuthPersEmail = EdocsApi.getAttributeValue("CounterpartyAuthPersEmail");
  if (person) {
    if (mapAuthPersons?.has(person)) {
      counterpartyAuthPersEmail.value = mapAuthPersons.get(person)[0];
      counterpartyAuthPersPhone.value = mapAuthPersons.get(person)[1];
    } else {
      EdocsApi.message(`помилка по ${person} CounterpartyAuthorizedPerson1`);
    }
  } else {
    counterpartyAuthPersEmail.value = null;
    counterpartyAuthPersPhone.value = null;
  }
  safeChangAttr(counterpartyAuthPersEmail);
  safeChangAttr(counterpartyAuthPersPhone);
}

function onChangeCounterpartyAuthorizedPerson1() {
  setAuthorizedPersonPhoneEmail(EdocsApi.getAttributeValue("CounterpartyAuthorizedPerson1").value);
}

function clearContractExtensioInfo() {
  if (EdocsApi.getAttributeValue("FlagProlongClear")?.value == "true") {
    var table = EdocsApi.getAttributeValue("ContractExtensioInfo");
    if (table && table.value.length > 0) {
      table.value = null;
      EdocsApi.setAttributeValue(table);
    }
    /*  var table2 = EdocsApi.getAttributeValue('GeneralStorageTerm');
        if(table2 && table2.value.length > 0){
             table2.value = null;
             EdocsApi.setAttributeValue(table2);
         }*/
    EdocsApi.setAttributeValue({ code: "FlagProlongClear", value: false });
  }
}
function onChangeContractExtensioInfo() {
  var ProlongationEnd = EdocsApi.getAttributeValue("ProlongationEnd");
  if (ProlongationEnd) {
    ProlongationEnd.value = EdocsApi.getAttributeValue("ContractExtensioInfo")
      ?.value?.pop()
      ?.find(x => x.code == "ContractExtensioDate")?.value;
    EdocsApi.setAttributeValue(ProlongationEnd);
  }
  onChangeProlongationEnd();
}

function clearPaymentConditionsTable() {
  if (CurrentDocument.isDraft && EdocsApi.getRelatedCases().length > 0 && EdocsApi.getAttributeValue("CounterpartyRegionID").value != "tryClear") {
    EdocsApi.setAttributeValue({ code: "PaymentConditions", value: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyRegionID", value: "tryClear" });
  }
}

//endregion
//
function onCreate() {
  EdocsApi.setAttributeValue({ code: "ClearFlag", value: "false", text: null });
  var contractExtDocId = EdocsApi.getAttributeValue("ContractExtDocId");
  if (contractExtDocId && !contractExtDocId.value) {
    //EdocsApi.message(`Створіть картку пов’язаного документа   з картки  основного договору  або основний договір не створено в 1С`);
    throw "Створіть картку пов’язаного документа з картки основного договору або основний договір не створено в 1С";
  }

  EdocsApi.setAttributeValue({ code: "PostPayment", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "BankDays", value: null, text: null });

  EdocsApi.setAttributeValue({ code: "ContarctEndDate", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Approvals", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "NameForSubject", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ApprovalNext", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Review", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Responsible", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ResponsibleDepartment1", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "FlagProlongClear", value: true });

  EdocsApi.setAttributeValue({ code: "CounterpartyEDRPOU", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyName", value: null, text: null });
  //EdocsApi.setAttributeValue({code: 'OrgEDRPOU', value: null, text: null});
  //EdocsApi.setAttributeValue({code: 'OrgName', value: null, text: null});
  EdocsApi.setAttributeValue({ code: "contractorId", value: null, text: null });
}

function onBeforeCardSave() {
  debugger;
  hasContractExtDocId();
  /*var contractExtensioInfo = EdocsApi.getAttributeValue('ContractExtensioInfo');
    if (contractExtensioInfo.value && contractExtensioInfo.value.length) {
        var requiredRow = contractExtensioInfo.value.map(t => t.filter(x => x.code == 'ContractExtensioDoc' && !x.value
            || x.code == 'ContractExtensioDate' && !x.value || x.code == 'ContractExtensio' && !x.value)).flat();
        if (requiredRow?.length) {
            throw `Заповніть обов'язкові поля таблиці "ПРОЛОНГАЦІЯ ДОГОВОРУ"`
        }
    }
    var planAmountTitle = EdocsApi.getAttributeValue('PlanAmountTitle');
    if (planAmountTitle && planAmountTitle.value?.length) {
        var requiredRow = planAmountTitle.value.map(t => t.filter(x =>
            x.code == 'PlanAmountStartDate' && !x.value || x.code == 'PlanAmountEndDate' && !x.value || x.code == 'PlanAmount' && !x.value)).flat();
        if (requiredRow?.length) {
            throw `Заповніть обов'язкові поля таблиці "ПЛАНОВА СУМА ДОГОВОРА (БЮДЖЕТ)"`
        }
    }*/
}
/*
// атрибут "Нормативний строк зберігання до:" (StorageTerm) проставити дату з врахуваванням даних колонки Таблиці SP "Кількість років зберагіння"
function setDate() {
    var storageTerm = EdocsApi.getAttributeValue('StorageTerm');
    if (storageTerm && !storageTerm.value) {
        var currDocName = CurrentDocument.templateName;
        var dateDoc = CurrentDocument.created;
        var id = EdocsApi.getDictionaryData('Term', currDocName, [{attributeCode: 'DocType', value: '0'}])[0].id;
        var array = EdocsApi.getDictionaryItemData('Term', id);
        var years = parseInt(EdocsApi.findElementByProperty('code', 'Term', array.attributes).value, 10);
        var term = new Date(dateDoc);
        storageTerm.value = term.setFullYear(term.getFullYear() + years);
        safeChangAttr(storageTerm);
    }
}*/

// Автозаполнение поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function isAct(items) {
  if (!items || !items.length) {
    return;
  }
  var tzOffset = new Date().getTimezoneOffset() * 60000;
  var currentDate = new Date(Date.now() - tzOffset).toISOString().slice(0, 10);
  console.log(`current date ${currentDate}`);
  for (var i in items) {
    if (items[i] != null) {
      var itDate = new Date(new Date(items[i]) - tzOffset).toISOString(); //.slice(0, 10);
      if (itDate >= currentDate) {
        return true;
      }
    }
  }
  return false;
}

function hasInit(dates) {
  for (let i in dates) {
    if (dates[i] != null) {
      return true;
    }
  }
  return false;
}

//статус договора в зависимости от даті окончания действия или даті пролонгации
function setContractStatus() {
  var contractStatus = EdocsApi.getAttributeValue("ContractStatus");
  var dates = [EdocsApi.getAttributeValue("ContarctEndDate").value, EdocsApi.getAttributeValue("ContractExtensioDate").value, EdocsApi.getAttributeValue("ContractExtensioDate1").value];
  if (!hasInit(dates)) {
    contractStatus.value = "Не задано";
  } else if (isAct(dates)) {
    contractStatus.value = "Діючий";
  } else {
    contractStatus.value = "Строк дії закінчився";
  }
  safeChangAttr(contractStatus);
}

// к функции автозаполнения поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function onChangeContarctEndDate() {
  setStoragePeriod(); //9
  setContractStatus();
}

// к функции автозаполнения поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function onChangeContractExtensioDate1() {
  setContractStatus();
}

// к функции автозаполнения поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function onChangeContractExtensioDate() {
  setContractStatus();
}

function onChangeDocumentTypeeDocs() {
  /* 9   var storageTerm = EdocsApi.getAttributeValue('StorageTerm');
     if (storageTerm && storageTerm.value === null) {
     setDate();
     }*/
  setStoragePeriod(); //9
  setEDocsDocTypeid(); //9
}

//Даний скрипт необхідний для визначення системного виду документа відповідно до обраного користувачем на картці.
function setEDocsDocTypeid() {
  var documentTypeeDocs = EdocsApi.getAttributeValue("DocumentTypeeDocs");
  // debugger;
  var i1 = EdocsApi.getAttributeValue("e-DocsDocTypeid");
  if (documentTypeeDocs && documentTypeeDocs.value) {
    var documentTypes = EdocsApi.getDictionaryItemData("DocumentTypes", documentTypeeDocs.value);
    if (documentTypes && documentTypes.attributes) {
      var attributes = documentTypes.attributes;
      var attribute = EdocsApi.findElementByProperty("code", "e_x002d_DocsDocTypeid", attributes);
      if (attribute) {
        if (i1.value != attribute.value) {
          EdocsApi.setAttributeValue({ code: "e-DocsDocTypeid", value: attribute.value });
        }
      } else {
        if (i1.value) {
          EdocsApi.setAttributeValue({ code: "e-DocsDocTypeid", value: null });
        }
      }
    }
  }
}

function clearData(attr) {
  attr.value = null;
  attr.text = null;
  safeChangAttr(attr);
}

//маршруту «Передача даних про пролонгацію в 1С» route code??
function onTaskExecuteSendOutDocESIGN() {
  var sendCreatedDoc = {
    userId: CurrentUser.login,
    edocsDocId: CurrentDocument.id,
    linkedDocs: EdocsApi.getRelatedCases(),
    documentUrl: CurrentDocument.url,
    docType: EdocsApi.getAttributeValue("DocumentType").value,
    extDocId: EdocsApi.getAttributeValue("ContractExtDocId").value,
    NextPeriod: "Договір внесення змін", //;EdocsApi.getAttributeValue('NextPeriod').text,
    ContractExtDocId: EdocsApi.getAttributeValue("ContractExtDocId").value,
  };
  sendCreatedDoc.attributes = [
    EdocsApi.getAttributeValue("BudgetPeriod"),
    EdocsApi.getAttributeValue("ConsumptionArticleProcurement"),
    EdocsApi.getAttributeValue("ExpenseItems"),
    EdocsApi.getAttributeValue("ConsumptionArticleMoneyMove"),
    EdocsApi.getAttributeValue("LetterProlongation"),
    EdocsApi.getAttributeValue("ProlongationComent"),
    //        {ConsumptionArticleProcurement: EdocsApi.getAttributeValue('ConsumptionArticleProcurement').text},
    //        {ExpenseItems: EdocsApi.getAttributeValue('ExpenseItems').text},
    //        {ConsumptionArticleMoneyMove: EdocsApi.getAttributeValue('ConsumptionArticleMoneyMove').text}
  ];
  if (EdocsApi.getAttributeValue("ChangeContract").value == "Зміни до періоду") {
    sendCreatedDoc.attributes.push({ code: "PlanAmountTitle", type: "table", value: [] });
    sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("ContractExtensioInfo"));
  } else if (EdocsApi.getAttributeValue("ChangeContract").value == "Зміни до планової суми та періоду при автопролонгації") {
    sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("PlanAmountTitle"));
    sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("ContractExtensioInfo"));
  } else if (EdocsApi.getAttributeValue("ChangeContract").value == "Зміни до планової суми") {
    sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("PlanAmountTitle"));
    sendCreatedDoc.attributes.push({ code: "ContractExtensioInfo", type: "table", value: [] });
  } else if (EdocsApi.getAttributeValue("ChangeContract").value == "Зміни до умов оплати") {
    sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("PlanAmountTitle"));
    sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("ContractExtensioInfo"));
    sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("PaymentConditions"));
    sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("PostPayment"));
    sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("BankDays"));
    sendCreatedDoc.attributes.push({ code: "CounterpartyStatusBoolean", value: "true", text: null });
  }
  //table
  var successMessage = "Документ успішно створено в 1С. Ідентифікатор документа ";
  var response = EdocsApi.runExternalFunction("1C", "edocsUpdateDoc", sendCreatedDoc);
  if (response.data) {
    if (response.data.extDocId) {
      if (response.data.warnings && response.data.warnings.length > 0) {
        var warningsMessage = "";
        for (var i = 0; i < response.data.warnings.length; i++) {
          warningsMessage += response.data.warnings[i].message + "; ";
        }
        EdocsApi.message(warningsMessage);
      } else {
        EdocsApi.message(successMessage + response.data.extDocId);
      }
      var ExtDocID = EdocsApi.getAttributeValue("extDocId");
      ExtDocID.value = response.data.extDocId;
      EdocsApi.setAttributeValue(ExtDocID);
    }
    if (response.data.error) {
      if (response.data.error.validationErrors && response.data.error.validationErrors.length > 0) {
        var errorMessage = "";
        for (var i = 0; i < response.data.error.validationErrors.length; i++) {
          errorMessage += response.data.error.validationErrors[i].message + "; ";
        }
        throw response.data.error.details + "  -  " + errorMessage;
      }
    }
  } else if (response.error) {
    throw response.error;
  } else {
    throw "Зовнішня система не повернула результ при створенні документу";
  }
}

/// відправки в e-sing
/// відправка коментарів та можливість скасування відправлених документів
function onTaskCommentedSendOutDoc(caseTaskComment) {
  var orgCode = EdocsApi.getAttributeValue("OrgEDRPOU").value;
  var orgShortName = EdocsApi.getAttributeValue("OrgName").value;
  if (!orgCode || !orgShortName) {
    return;
  }
  var isCaceling = caseTaskComment.comment && caseTaskComment.comment.toLowerCase().startsWith("#cancel#");
  if (isCaceling) {
    caseTaskComment.comment = caseTaskComment.comment.slice(8);
  }
  var methodData = {
    extSysDocId: CurrentDocument.id,
    extSysDocVersion: CurrentDocument.version,
    eventType: isCaceling ? "CancelProcessing" : "CommentAdded",
    comment: caseTaskComment.comment,
    partyCode: orgCode,
    userTitle: CurrentUser.name,
    partyName: orgShortName,
    occuredAt: new Date(),
  };
  caseTaskComment.externalAPIExecutingParams = {
    externalSystemCode: "ESIGN", // код зовнішньої системи
    externalSystemMethod: "integration/processEvent", // метод зовнішньої системи
    data: methodData, // дані, що очікує зовнішня система для заданого методу
    executeAsync: true, // виконувати завдання асинхронно
  };
}

//выбор ЕДРПОУ юр.особы, запись в скрытое поле "разрез" Accountant
function onChangeOrgEDRPOU() {
  var orgEDRPOU = EdocsApi.getAttributeValue("OrgEDRPOU");
  if (orgEDRPOU.value) {
    EdocsApi.setAttributeValue({ code: "Accountant", value: orgEDRPOU.value });
  } else {
    EdocsApi.setAttributeValue({ code: "Accountant", value: null });
  }
}

//region
function onChangeOrgatization() {
  setDirectorsOnRoute();
}

//блокировка запуска по маршруту, если текущая дата больше даты НПК
//определение аббревиатуры организации для вывода в маску номера
function setOrganization() {
  var organization = EdocsApi.getAttributeValue("Organization").value;
  var abbreviation = EdocsApi.getAttributeValue("OrganizationAbv");
  var prevabbreviation = EdocsApi.getAttributeValue("OrganizationAbv");
  if (organization) {
    if (organization == `ДП "СТАДА-УКРАЇНА" (32110540)`) {
      abbreviation.value = "ДП";
    } else if (organization == `ТОВ "ФАРМАЦЕВТИЧНИЙ ЗАВОД 'БІОФАРМА' " (39071152)`) {
      abbreviation.value = "ФЗ";
    } else if (organization == `ТОВ "БІОФАРМА-ІНВЕСТ" (35942229)`) {
      abbreviation.value = "БІ";
    }
  } else {
    abbreviation.value = null;
  }
  if (prevabbreviation.value != abbreviation.value) {
    safeChangAttr(abbreviation);
  }
}

//блокировка запуска по маршруту, если текущая дата больше даты НПК
function onRouteStart() {
  var CounterpartyStatus = EdocsApi.getAttributeValue("CounterpartyStatus");
  if (CounterpartyStatus && CounterpartyStatus.value == "Не підлягає") return;

  var currentDate = new Date(CurrentDocument.created).setHours(0, 0, 0, 0);
  var auditDateUntil = EdocsApi.getAttributeValue("AuditDateUntil").value;
  var auditDate = new Date(auditDateUntil).setHours(0, 0, 0, 0);
  if (currentDate > auditDate) {
    throw "По даному контрагенту прострочено дату НПК";
  }
}

function onChangeAdditionalContract1С() {
  var additionalContract1С = EdocsApi.getAttributeValue("AdditionalContract1С");
  var docKindContact1С = EdocsApi.getAttributeValue("DocKindContact1С");
  if (additionalContract1С && additionalContract1С.value) {
    docKindContact1С.value = additionalContract1С.value;
  } else {
    docKindContact1С.value = null;
  }
  safeChangAttr(docKindContact1С);
}

// отражение руководителя подразделения Инициатора
function onChangeResponsible() {
  var responsibleDirector = EdocsApi.getAttributeValue("ResponsibleDirector");
  var responsible = EdocsApi.getAttributeValue("Responsible");
  //debugger;
  if (responsible.value) {
    var manager = EdocsApi.getEmployeeManagerByEmployeeID(responsible.value);
    if (manager && manager.unitLevel > 1) {
      if (manager.unitLevel > 2) {
        var item = EdocsApi.getEmployeeManagerByEmployeeID(responsible.value, 2).managerId;
        responsibleDirector.value = item;
      } else {
        responsibleDirector.value = manager.managerId;
      }
    } else {
      responsibleDirector.text = responsible.text;
      responsibleDirector.value = responsible.value;
    }
    safeChangAttr(responsibleDirector);
  } else {
    clearData(responsibleDirector);
    safeChangAttr(responsibleDirector);
    safeChangAttr({ code: "ResponsibleDepartment1", value: null, text: null });
  }
}

function getName(id) {
  if (id) {
    //return EdocsApi.getEmployeeDataByEmployeeID(id).surnameNM;
    return EdocsApi.getEmployeeDataByEmployeeID(id).fullName;
  }
}

function onChangeManager() {
  // debugger
  var initiator = EdocsApi.getAttributeValue("Manager");
  var departmentInitiator = EdocsApi.getAttributeValue("ResponsibleDepartmentHead");
  debugger;
  if (initiator && initiator.value) {
    var manager = EdocsApi.getEmployeeManagerByEmployeeID(initiator.value);
    if (manager && manager.unitLevel != 1) {
      if (manager.managerId == initiator.value && manager.unitLevel != 2) {
        var item = EdocsApi.getEmployeeManagerByEmployeeID(initiator.value, manager.unitLevel - 1).managerId;
        departmentInitiator.value = item;
        departmentInitiator.text = getName(item);
      } else {
        departmentInitiator.value = manager.managerId;
        departmentInitiator.text = getName(manager.managerId);
      }
    } else {
      departmentInitiator.value = initiator.value;
      departmentInitiator.text = initiator.text;
    }
  } else {
    departmentInitiator.value = null;
    departmentInitiator.text = null;
  }
  if (EdocsApi.getAttributeValue("ResponsibleDepartmentHead").value != departmentInitiator.value) safeChangAttr(departmentInitiator);
}

function hasParentCases() {
  var relCase = EdocsApi.getRelatedCases();
  if (relCase && relCase.length && relCase[0].isParentForCurrent) {
    return true;
  }
  return false;
}

//Перевірка наявності зв’язку (ідентифікатору основної угоди) при створенні додаткової угоди
function hasContractExtDocId() {
  var relatedCases = EdocsApi.getRelatedCases();
  var contractExtDocId = EdocsApi.getAttributeValue("ContractExtDocId");
  if (relatedCases && relatedCases[0] && !relatedCases[0].isParentForCurrent) {
    if (contractExtDocId && !contractExtDocId.value) {
      //EdocsApi.message(`Створіть картку пов’язаного документа   з картки  основного договору  або основний договір не створено в 1С`);
      throw "Створіть картку пов’язаного документа з картки основного договору або основний договір не створено в 1С";
    }
  }
}

function onChangeManagerDepartment() {
  var managerDepartment = EdocsApi.getAttributeValue("ManagerDepartment");
  var documentTypeeDocs = EdocsApi.getAttributeValue("DocumentTypeeDocs");
  if (managerDepartment && managerDepartment.value === null) {
    documentTypeeDocs = { code: "DocumentTypeeDocs", value: null, text: null };
    safeChangAttr(documentTypeeDocs);
  } else {
    onChangeDocumentTypeeDocs();
  }
}

function onChangeTypeProlongation() {
  setDirectorsOnRoute();
  setStoragePeriod();
  setProbByChangeContract();
}

// виведення Відповідальних підписантів при виборі "Виду основного договору" та перевірці Дом. організації ok
function setDirectorsOnRoute() {
  var organization = EdocsApi.getAttributeValue("Organization").value;
  var typeProlongation = EdocsApi.getAttributeValue("TypeProlongation").value;
  if (organization && typeProlongation) {
    var tempData = EdocsApi.getDictionaryData("Directors1", typeProlongation.value, [{ attributecode: "Title", value: organization.value }])[0];
    if (!tempData) {
      return;
    }
    var array = EdocsApi.getDictionaryItemData("Directors1", tempData.id);
    if (!(array && array.length)) {
      return;
    }
    var director1 = EdocsApi.getAttributeValue("Director1");
    var director = EdocsApi.getAttributeValue("Director");
    director1.value = array.find(x => x.code == "Director1");
    director.value = array.find(x => x.code == "Director");
    safeChangAttr(director1);
    safeChangAttr(director);
  }
}

//region Search all
//запрос в 1С на передачу нам инфо о контрагенте ok
function onSearchCounterparty(request) {
  request.filterCollection.push({ attributeCode: "ContractorType", value: "Creditor" });
  request.filterCollection.push({ attributeCode: "ContractorType", value: "Debtor" });
}

//  Відбір переліку договорів із 1С по вибраній домашній організації та контрагенту.
//Із 1С повертається перелік договорів за вказаними вхідними параметрами.
//Після вибору  договору на картці Користувачем із запропонованого переліку записуємо id Договору в полі «AdditionalContract1С» на картці.
function onSearchAdditionalContract1С(data) {
  var DocumentCharacter = EdocsApi.getAttributeValue("DocumentCharacter");
  if (DocumentCharacter.value == null || DocumentCharacter.value == "Договір") {
    return;
  }
  var Organizationid = EdocsApi.getAttributeValue("Organizationid");
  // var contractorId = EdocsApi.getAttributeValue('contractorId');
  if (Organizationid && Organizationid.value) {
    data.filterCollection.push({ attributeCode: "ContractorType", value: Organizationid.value });
  }
  if (typeProlongation && typeProlongation.value) {
    data.filterCollection.push({ attributeCode: "Title", value: typeProlongation.value });
  }
}

function onSearchTypeDoc(request) {
  var dep = EdocsApi.getAttributeValue("ManagerDepartment").text;
  if (dep) {
    request.filterCollection.push({ attributeCode: "Initiator", value: dep });
  }
}

function onSearchManagerDepartment(request) {
  var typeDoc = EdocsApi.getAttributeValue("TypeDoc").value;
  var docKindeDocsNew = EdocsApi.getAttributeValue("DocKindeDocsNew").value;
  if (docKindeDocsNew) {
    request.filterCollection.push({ attributeCode: "Title", value: docKindeDocsNew });
  }
  if (typeDoc) {
    request.filterCollection.push({ attributeCode: "ManagerDepartment", value: "1" });
  }
}

function onSearchDocumentTypeeDocs(data) {
  var typeProlongation = EdocsApi.getAttributeValue("TypeProlongation");
  var managerDepartment = EdocsApi.getAttributeValue("ManagerDepartment");
  if (managerDepartment && managerDepartment.text) {
    data.filterCollection.push({ attributeCode: "Initiator", value: managerDepartment.text });
  }
  if (typeProlongation && typeProlongation.value) {
    data.filterCollection.push({ attributeCode: "Title", value: typeProlongation.value });
  }
}

//endregion
function safeChangAttr(attr) {
  if (CurrentDocument.isDraft) {
    EdocsApi.setAttributeValue(attr);
  }
}

function onCardInitialize() {
  setPropContractExtension();
  clearContractExtensioInfo();
  onChangeManager();
  setProbByChangeContract();

  // onChangeAddAgrAddingChanges();
  var flag = EdocsApi.getAttributeValue("ClearFlag");
  if (flag.value == "false") {
    debugger;
    actualCounterpartyAndOrg();

    var res = EdocsApi.runExternalFunction("1C", "edocsGetDoc", { edocsDocId: EdocsApi.getAttributeValue("ContractExtDocId")?.value });
    if (res) {
      EdocsApi.setAttributeValue({ code: "ContarctEndDate", value: res.data?.outcontractors[0]?.ContarctEndDate, text: null });
      EdocsApi.setAttributeValue({ code: "LetterProlongation", value: res.data?.outcontractors[0]?.LetterProlongation, text: null });
      EdocsApi.setAttributeValue({ code: "ProlongationComent", value: res.data?.outcontractors[0]?.ProlongationComent, text: null });
      EdocsApi.setControlProperties({ code: "ContarctEndDate", hidden: false, disabled: true, required: false });
    } else {
      throw " система 1С не повернула дані з основного договору";
    }

    if (hasParentCases()) {
      EdocsApi.setAttributeValue({ code: "extDocId", value: null });
    }

    clearTables();
    flag.value = "true";
    EdocsApi.setAttributeValue(flag);
  }
  setLinkFieldsDocumentType();
  setStoragePeriod();
  clearPaymentConditionsTable();
}

function onChangeProlongationEnd() {
  var ProlongationEnd = EdocsApi.getAttributeValue("ProlongationEnd")?.value;
  if (ProlongationEnd) {
    var currDocName = EdocsApi.getAttributeValue("DocKindeDocsNew").value;
    var id = EdocsApi.getDictionaryData("Term", currDocName, [{ attributeCode: "DocType", value: "0" }])[0]?.id;
    if (id) {
      var array = EdocsApi.getDictionaryItemData("Term", id);
      var years = parseInt(EdocsApi.findElementByProperty("code", "Term", array.attributes).value, 10);

      EdocsApi.setAttributeValue({ code: "ProlongedStorageTerm", value: new Date(new Date(ProlongationEnd).getFullYear() + 1 + years, 0, 1).toISOString(), text: null });
    } else {
      EdocsApi.message("В довіднику відсутній відповідний запис. Будь ласка, зверніться до адміністратора");
    }
  } else {
    EdocsApi.setAttributeValue({ code: "ProlongedStorageTerm", value: null, text: null });
  }
}

function onChangeAddAgrAddingChanges() {
  var addAgrAddingChanges = EdocsApi.getAttributeValue("AddAgrAddingChanges");
  if (addAgrAddingChanges.value == "true") {
    EdocsApi.setControlProperties({ code: "ContractExtensioDate", required: true });
    EdocsApi.setControlProperties({ code: "ContractExtensioDoc", required: true });
    EdocsApi.setControlProperties({ code: "ContractExtensio", required: false });
  } else {
    EdocsApi.setControlProperties({ code: "ContractExtensioDate", required: false });
    EdocsApi.setControlProperties({ code: "ContractExtensioDoc", required: false });
    EdocsApi.setControlProperties({ code: "ContractExtensio", required: false });
  }
}

function clearTables() {
  var planAmountTitle = EdocsApi.getAttributeValue("PlanAmountTitle");
  if (planAmountTitle && planAmountTitle.value && planAmountTitle.value.length) {
    planAmountTitle.value.forEach(t =>
      t.forEach(x => {
        if (x.code == "PlanAmountStartDate" || x.code == "PlanAmountEndDate" || x.code == "PlanAmount") {
          x.value = null;
        }
      })
    );
  }
  EdocsApi.setAttributeValue(planAmountTitle);
}

function onChangeChangeContract() {
  var letterProlongation = EdocsApi.getAttributeValue("LetterProlongation").value;
  var changeContract = EdocsApi.getAttributeValue("ChangeContract").value;
  if (changeContract == "Зміни до планової суми") {
    EdocsApi.setAttributeValue({ code: "ContractExtensioInfo", value: null, text: null });
  } else if (changeContract == "Зміни до періоду" && letterProlongation == "Автопролонгація") {
    clearTables();
  } else {
    EdocsApi.setAttributeValue({ code: "ContractExtensioInfo", value: null, text: null });
    clearTables();
  }
  setPropContractExtension();

  setProbByChangeContract();
}

function setProbByChangeContract() {
  var ChangeContract = EdocsApi.getAttributeValue("ChangeContract").value;
  if (ChangeContract == "Зміни до умов оплати") {
    var TypeProlongation = EdocsApi.getAttributeValue("TypeProlongation").value;
    if (TypeProlongation == 'ДД "з Продавцем" ComOps' || TypeProlongation == 'ДД "з Продавцем" TechOps') {
      setPropTablesPaymentConditions(true);
    } else {
      setPropTablesPaymentConditions(false);
    }
    if (TypeProlongation == 'ДД "з Покупцем"  TechOps' || TypeProlongation == 'ДД "з Покупцем"  ComOps') {
      setPropTablesGeneralPlan(true);
    } else {
      setPropTablesGeneralPlan(false);
    }
  } else {
    setPropTablesPaymentConditions(false);
    setPropTablesGeneralPlan(false);
  }
}

function setPropTablesPaymentConditions(state) {
  EdocsApi.setControlProperties({ code: "PaymentConditions", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "PaymentConditionsPercent", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "PaymentConditionsDays", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "PaymentConditionsDocument", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "PaymentConditionsComment", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "GeneralComment1", hidden: !state, disabled: false, required: state });
}

function setPropTablesGeneralPlan(state) {
  EdocsApi.setControlProperties({ code: "GeneralPlanAmountTitle", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "PostPayment", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "BankDays", hidden: !state, disabled: false, required: state });
}

function onChangeLetterProlongation() {
  onChangeChangeContract();
}

function setPropContractExtension() {
  var letterProlongation = EdocsApi.getAttributeValue("LetterProlongation").value;
  var changeContract = EdocsApi.getAttributeValue("ChangeContract").value;
  // debugger;
  if (changeContract == "Зміни до планової суми") {
    EdocsApi.setControlProperties({ code: "GeneralPlanAmountTitle", hidden: false, required: false });
    EdocsApi.setControlProperties({ code: "PlanAmountTitle", hidden: false, required: false });
    EdocsApi.setControlProperties({ code: "Sum", hidden: false });
    EdocsApi.setControlProperties({ code: "PlanAmountStartDate", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "PlanAmountEndDate", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "PlanAmount", hidden: false, required: true });
    //
    EdocsApi.setControlProperties({ code: "ContractExtensioInfo", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "ContractExtensioDate", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "ContractExtensioDoc", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "ContractExtensio", hidden: true, required: false });
  } else if (changeContract == "Зміни до періоду" && letterProlongation == "Автопролонгація") {
    EdocsApi.setControlProperties({ code: "ContractExtensioInfo", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "ContractExtensioDate", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "ContractExtensioDoc", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "ContractExtensio", hidden: false, required: false }); //
    //
    EdocsApi.setControlProperties({ code: "GeneralPlanAmountTitle", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "PlanAmountTitle", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "Sum", hidden: true });
    EdocsApi.setControlProperties({ code: "PlanAmountStartDate", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "PlanAmountEndDate", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "PlanAmount", hidden: true, required: false });
  } else if (changeContract == "Зміни до планової суми та періоду при автопролонгації" && letterProlongation == "Автопролонгація") {
    EdocsApi.setControlProperties({ code: "ContractExtensioInfo", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "ContractExtensioDate", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "ContractExtensioDoc", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "ContractExtensio", hidden: false, required: false }); //
    //
    EdocsApi.setControlProperties({ code: "GeneralPlanAmountTitle", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "PlanAmountTitle", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "Sum", hidden: false });
    EdocsApi.setControlProperties({ code: "PlanAmountStartDate", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "PlanAmountEndDate", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "PlanAmount", hidden: false, required: true });
  } else {
    EdocsApi.setControlProperties({ code: "ContractExtensioInfo", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "ContractExtensioDate", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "ContractExtensioDoc", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "ContractExtensio", hidden: true, required: false });
    //
    EdocsApi.setControlProperties({ code: "GeneralPlanAmountTitle", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "PlanAmountTitle", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "Sum", hidden: true });
    EdocsApi.setControlProperties({ code: "PlanAmountStartDate", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "PlanAmountEndDate", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "PlanAmount", hidden: true, required: false });
  }
}

//
function onChangeDocumentType() {
  var documentType = EdocsApi.getAttributeValue("DocumentType");
  if (documentType?.text != "Договір з КОЛ") {
    safeChangAttr({ code: "CounterpartyKOL", value: null, text: null });
    safeChangAttr({ code: "CounterpartyYearAmount", value: null, text: null });
    safeChangAttr({ code: "CounterpartyNumberAgreement", value: null, text: null });
    safeChangAttr({ code: "CounterpartyYearLimit", value: null, text: null });
    safeChangAttr({ code: "CounterpartAmount", value: null, text: null });
  }
  setLinkFieldsDocumentType();
}

function setLinkFieldsDocumentType() {
  var documentType = EdocsApi.getAttributeValue("DocumentType");
  if (documentType?.text == "Договір з КОЛ") {
    EdocsApi.setControlProperties({ code: "CounterpartyKOL", hidden: false, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyYearAmount", hidden: false, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyNumberAgreement", hidden: false, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyYearLimit", hidden: false, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartAmount", hidden: false, disabled: false, required: false });
  } else {
    EdocsApi.setControlProperties({ code: "CounterpartyKOL", hidden: true, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyYearAmount", hidden: true, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyNumberAgreement", hidden: true, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyYearLimit", hidden: true, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartAmount", hidden: true, disabled: false, required: false });
  }
}

function setStoragePeriod() {
  //storageTerm && storageTerm.value === null &&
  var contarctEndDate = EdocsApi.getAttributeValue("ContarctEndDate");

  var generalStorageTerm = EdocsApi.getAttributeValue("GeneralStorageTerm");
  if (contarctEndDate.value && !generalStorageTerm.value.length) {
    var currDocName = EdocsApi.getAttributeValue("DocKindeDocsNew").value;
    var id = EdocsApi.getDictionaryData("Term", currDocName, [{ attributeCode: "DocType", value: "0" }])[0].id;
    var array = EdocsApi.getDictionaryItemData("Term", id);
    var years = parseInt(EdocsApi.findElementByProperty("code", "Term", array.attributes).value, 10);
    generalStorageTerm.value = [[{ code: "StorageTerm", value: new Date(new Date(contarctEndDate.value).getFullYear() + 1 + years, 0, 1).toISOString() }]];
  } else {
    generalStorageTerm.value[0]?.forEach(x => {
      if (x.code == "StorageTerm") x.value = null;
    });
  }
  EdocsApi.setAttributeValue(generalStorageTerm);
}

function onButtonPushCounterpartyButton() {
  onChangecontractorId(true);
}

function setUpdateWith1CSystemAttr(data) {
  debugger;
  if (data) {
    //EdocsApi.setAttributeValue({ code: "Counterparty", value: `${data.ShortName} (${data.code})`, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAccount", value: data.accounts?.CounterpartyAccount || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyCurrency", value: data.accounts?.CounterpartyCurrency || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyBank", value: data.accounts?.CounterpartyBank || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyMFO", value: data.accounts?.CounterpartyMFO || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyName", value: data.attributes.find(x => x.code == "CounterpartyName")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyFullName", value: data.attributes.find(x => x.code == "CounterpartyFullName")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyEDRPOU", value: data.attributes.find(x => x.code == "CounterpartyEDRPOU")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyINN", value: data.attributes.find(x => x.code == "CounterpartyINN")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyLegalAddress", value: data.attributes.find(x => x.code == "CounterpartyLegalAddress")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyPostalAddress", value: data.attributes.find(x => x.code == "CounterpartyPostalAddress")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyPhone", value: data.attributes.find(x => x.code == "CounterpartyPhone")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyEmail", value: data.attributes.find(x => x.code == "CounterpartyEmail")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthorizedPerson1", value: data.authorisedPersons[0]?.FullName || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthPersPosition", value: data.authorisedPersons[0]?.Position || null, text: null });
  }
}
