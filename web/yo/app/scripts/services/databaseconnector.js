'use strict';

angular.module('oncokbApp')
    .factory('DatabaseConnector', [
        '$timeout',
        '$q',
        '$rootScope',
        'config',
        'Gene',
        'Alteration',
        'TumorType',
        'Evidence',
        'SearchVariant',
        'GenerateDoc',
        'DriveOncokbInfo',
        'DriveAnnotation',
        'SendEmail',
        'DataSummary',
        'Cache',
        'OncoTree',
        'InternalAccess',
        'ApiUtils',
        'PrivateApiUtils',
        'user',
        '_',
        function($timeout,
                 $q,
                 $rootScope,
                 config,
                 Gene,
                 Alteration,
                 TumorType,
                 Evidence,
                 SearchVariant,
                 GenerateDoc,
                 DriveOncokbInfo,
                 DriveAnnotation,
                 SendEmail,
                 DataSummary,
                 Cache,
                 OncoTree,
                 InternalAccess,
                 ApiUtils,
                 PrivateApiUtils,
                 user,
                 _) {
            var numOfLocks = {};
            var data = {};

            // When running locally, set this to true, all servlet will read data from relative files.
            var dataFromFile = config.testing || false;

            function getAllGene(callback, timestamp) {
                if (dataFromFile) {
                    Gene.getFromFile()
                        .success(function(data) {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback(data);
                        })
                        .error(function() {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback();
                        });
                } else {
                    Gene.getFromServer()
                        .success(function(data) {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback(data);
                        })
                        .error(function() {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback();
                        });
                }
            }

            function getDataSummary() {
                var deferred = $q.defer();
                if (dataFromFile) {
                    DataSummary.getFromFile()
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(result) {
                            deferred.reject(result);
                        });
                } else {
                    DataSummary.getFromFile()
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(result) {
                            deferred.reject(result);
                        });
                }
                return deferred.promise;
            }
            function getReviewedData(evidenceType) {
                var deferred = $q.defer();
                if (evidenceType === 'geneType') {
                    DataSummary.getGeneType()
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(result) {
                            deferred.reject(result);
                        });
                } else {
                    DataSummary.getEvidenceByType(evidenceType)
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(result) {
                            deferred.reject(result);
                        });
                }
                return deferred.promise;
            }
            function getAllAlteration(callback, timestamp) {
                if (dataFromFile) {
                    Alteration.getFromFile()
                        .success(function(data) {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback(data);
                        })
                        .error(function() {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback();
                        });
                } else {
                    Alteration.getFromServer()
                        .success(function(data) {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback(data);
                        })
                        .error(function() {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback();
                        });
                }
            }

            function getOncokbInfo(callback, timestamp) {
                if (dataFromFile) {
                    DriveOncokbInfo.getFromFile()
                        .success(function(data) {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback(data);
                        })
                        .error(function() {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback();
                        });
                } else {
                    DriveOncokbInfo.getFromServer()
                        .success(function(data) {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback(data);
                        })
                        .error(function() {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback();
                        });
                }
            }

            function getAllTumorType(callback, timestamp) {
                if (dataFromFile) {
                    TumorType.getFromFile()
                        .success(function(data) {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback(data);
                        })
                        .error(function() {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback();
                        });
                } else {
                    TumorType.getFromServer()
                        .success(function(data) {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback(data);
                        })
                        .error(function() {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback();
                        });
                }
            }

            function getAllEvidence(callback, timestamp) {
                if (dataFromFile) {
                    Evidence.getFromFile()
                        .success(function(data) {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback(data);
                        })
                        .error(function() {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback();
                        });
                } else {
                    Evidence.getFromServer()
                        .success(function(data) {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback(data);
                        })
                        .error(function() {
                            if (timestamp) {
                                numOfLocks[timestamp]--;
                            }
                            callback();
                        });
                }
            }

            function searchVariant(params, success, fail) {
                if (dataFromFile) {
                    SearchVariant.annotationFromFile(params)
                        .success(function(data) {
                            success(data);
                        })
                        .error(function() {
                            fail();
                        });
                } else {
                    SearchVariant
                        .getAnnotation(params)
                        .success(function(data) {
                            success(data);
                        })
                        .error(function() {
                            fail();
                        });
                }
            }

            function generateGoogleDoc(params, success, fail) {
                console.log(params);
                if (dataFromFile) {
                    success('');
                } else {
                    GenerateDoc
                        .getDoc(params)
                        .success(function(data) {
                            success(data);
                        })
                        .error(function() {
                            fail();
                        });
                }
            }

            function updateGene(data, success, fail) {
                if (dataFromFile) {
                    success('');
                } else {
                    DriveAnnotation
                        .updateGene(data)
                        .success(function(data) {
                            success(data);
                        })
                        .error(function() {
                            fail();
                        });
                }
            }

            function updateGeneType(hugoSymbol, data, historyData, success, fail) {
                if (dataFromFile) {
                    success('');
                } else {
                    DriveAnnotation
                        .updateGeneType(hugoSymbol, data)
                        .success(function(data) {
                            success(data);
                            updateHistory(historyData);
                        })
                        .error(function() {
                            fail();
                        });
                }
            }

            function updateEvidence(uuid, data, success, fail) {
                DriveAnnotation
                    .updateEvidence(uuid, data)
                    .success(function(data) {
                        success(data);
                    })
                    .error(function() {
                        fail();
                    });
            }

            function getEvidencesByUUID(uuid, success, fail) {
                if (dataFromFile) {
                    success('');
                } else {
                    DriveAnnotation
                        .getEvidencesByUUID(uuid)
                        .success(function(data) {
                            success(data);
                        })
                        .error(function() {
                            fail();
                        });
                }
            }

            function getEvidencesByUUIDs(uuids, success, fail) {
                if (dataFromFile) {
                    success('');
                } else {
                    DriveAnnotation
                        .getEvidencesByUUIDs(uuids)
                        .success(function(data) {
                            success(data);
                        })
                        .error(function() {
                            fail();
                        });
                }
            }
            function getPubMedArticle(pubMedIDs, success, fail) {
                DriveAnnotation
                    .getPubMedArticle(pubMedIDs)
                    .success(function(data) {
                        success(data);
                    })
                    .error(function() {
                        fail();
                    });
            }
            function getClinicalTrial(nctId, success, fail) {
                DriveAnnotation
                    .getClinicalTrial(nctId)
                    .success(function(data) {
                        success(data);
                    })
                    .error(function() {
                        fail();
                    });
            }

            function deleteEvidences(data, historyData, success, fail) {
                if (dataFromFile) {
                    success('');
                } else {
                    DriveAnnotation
                        .deleteEvidences(data)
                        .success(function(data) {
                            success(data);
                            updateHistory(historyData);
                        })
                        .error(function() {
                            fail();
                        });
                }
            }

            function updateVUS(hugoSymbol, data, success, fail) {
                if ($rootScope.internal) {
                    if (dataFromFile) {
                        success('');
                    } else {
                        DriveAnnotation
                            .updateVUS(hugoSymbol, data)
                            .success(function(data) {
                                success(data);
                            })
                            .error(function(error) {
                                var subject = 'VUS update Error for ' + hugoSymbol;
                                var content = 'The system error returned is ' + JSON.stringify(error);
                                sendEmail({sendTo: 'dev.oncokb@gmail.com', subject: subject, content: content},
                                    function(result) {
                                        console.log('sent old history to oncokb dev account');
                                    },
                                    function(error) {
                                        console.log('fail to send old history to oncokb dev account', error);
                                    }
                                );
                                fail(error);
                                setAPIData('vus', hugoSymbol, data);
                            });
                    }
                } else {
                    setAPIData('vus', hugoSymbol, data);
                }
            }
            function setAPIData(type, hugoSymbol, data) {
                if (!$rootScope.apiData.has(hugoSymbol)) {
                    $rootScope.apiData.set(hugoSymbol, $rootScope.metaModel.createMap());
                }
                if (type === 'vus') {
                    $rootScope.apiData.get(hugoSymbol).set('vus', $rootScope.metaModel.createMap({data: data}));
                } else if (type === 'priority' || type === 'drug') {
                    // TODO
                    // $rootScope.apiData.get(hugoSymbol).set(type, $rootScope.metaModel.createList(''));
                }
            }
            function updateEvidenceBatch(data, historyData, success, fail) {
                if (dataFromFile) {
                    success('');
                } else {
                    DriveAnnotation
                        .updateEvidenceBatch(data)
                        .success(function(data) {
                            success(data);
                            updateHistory(historyData);
                        })
                        .error(function() {
                            fail();
                        });
                }
            }

            function updateEvidenceTreatmentPriorityBatch(data, success, fail) {
                if (dataFromFile) {
                    success('');
                } else {
                    DriveAnnotation
                        .updateEvidenceTreatmentPriorityBatch(data)
                        .success(function(data) {
                            success(data);
                        })
                        .error(function() {
                            fail();
                        });
                }
            }

            function createGoogleFolder(params) {
                var deferred = $q.defer();

                if (dataFromFile) {
                    deferred.resolve('test name');
                } else {
                    GenerateDoc
                        .createFolder(params)
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function() {
                            deferred.reject();
                        });
                }
                return deferred.promise;
            }

            function sendEmail(params, success, fail) {
                if (dataFromFile) {
                    success(true);
                } else {
                    SendEmail
                        .init(params)
                        .success(function(data) {
                            success(data);
                        })
                        .error(function() {
                            fail();
                        });
                }
            }

            function timeout(callback, timestamp) {
                $timeout(function() {
                    if (numOfLocks[timestamp] === 0) {
                        callback(data[timestamp]);
                    } else {
                        timeout(callback, timestamp);
                    }
                }, 100);
            }

            function testAccess(successCallback, failCallback) {
                if (dataFromFile) {
                    if (angular.isFunction(successCallback)) {
                        successCallback();
                    }
                } else {
                    InternalAccess
                        .hasAccess()
                        .success(function(data, status, headers, config) {
                            if (angular.isFunction(successCallback)) {
                                successCallback(data, status, headers, config);
                            }
                        })
                        .error(function(data, status, headers, config) {
                            if (angular.isFunction(failCallback)) {
                                failCallback(data, status, headers, config);
                            }
                        });
                }
            }

            function getCacheStatus() {
                var deferred = $q.defer();
                if (dataFromFile) {
                    deferred.resolve('enabled');
                } else {
                    Cache.getStatus()
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(result) {
                            deferred.reject(result);
                        });
                }
                return deferred.promise;
            }

            function setCache(operation) {
                var deferred = $q.defer();
                if (dataFromFile) {
                    if (operation === 'enable') {
                        deferred.resolve('enabled');
                    }
                    if (operation === 'disable') {
                        deferred.resolve('disabled');
                    }
                } else {
                    switch (operation) {
                    case 'disable':
                        Cache.disable()
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(result) {
                                deferred.reject(result);
                            });
                        break;
                    case 'enable':
                        Cache.enable()
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(result) {
                                deferred.reject(result);
                            });
                        break;
                    case 'reset':
                        Cache.reset()
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(result) {
                                deferred.reject(result);
                            });
                        break;
                    default:
                        break;
                    }
                }
                return deferred.promise;
            }

            function updateGeneCache(hugoSymbol) {
                var deferred = $q.defer();
                if (dataFromFile) {
                    deferred.resolve();
                } else if (hugoSymbol) {
                    Cache.updateGene(hugoSymbol)
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(result) {
                            deferred.reject(result);
                        });
                } else {
                    deferred.reject();
                }
                return deferred.promise;
            }

            function getAllOncoTreeMainTypes() {
                var deferred = $q.defer();
                OncoTree.getAllMainTypes()
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(result) {
                        deferred.reject(result);
                    });
                return deferred.promise;
            }

            function getAllOncoTreeSubtypes() {
                var deferred = $q.defer();
                OncoTree.getAllSubtypes()
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(result) {
                        deferred.reject(result);
                    });
                return deferred.promise;
            }

            function getOncoTreeTumorTypesByMainType(mainType) {
                var deferred = $q.defer();
                if (mainType) {
                    OncoTree.getAllSubtypes()
                        .success(function(data) {
                            deferred.resolve(_.filter(data, function(o) {
                                return o.mainType && o.mainType.name === mainType;
                            }));
                        })
                        .error(function(result) {
                            deferred.reject(result);
                        });
                } else {
                    deferred.resolve([]);
                }
                return deferred.promise;
            }

            function getIsoforms(type) {
                var deferred = $q.defer();
                ApiUtils.getIsoforms(type)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(result) {
                        deferred.reject(result);
                    });
                return deferred.promise;
            }

            function getOncogeneTSG() {
                var deferred = $q.defer();
                ApiUtils.getOncogeneTSG()
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(result) {
                        deferred.reject(result);
                    });
                return deferred.promise;
            }

            function getSuggestedVariants() {
                var deferred = $q.defer();
                if (dataFromFile) {
                    deferred.resolve({
                        meta: '',
                        data: ['Fusion']
                    });
                } else {
                    PrivateApiUtils.getSuggestedVariants()
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(result) {
                            deferred.reject(result);
                        });
                }
                return deferred.promise;
            }

            function isHotspot(hugoSymbol, variant) {
                var deferred = $q.defer();
                if (dataFromFile) {
                    deferred.resolve({
                        meta: '',
                        data: false
                    });
                } else {
                    PrivateApiUtils.isHotspot(hugoSymbol, variant)
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(result) {
                            deferred.reject(result);
                        });
                }
                return deferred.promise;
            }

            function updateHistory(historyData) {
                if (!$rootScope.model.getRoot().get('history')) {
                    $rootScope.model.getRoot().set('history', $rootScope.model.createList());
                    return;
                }
                var apiHistory = $rootScope.model.getRoot().get('history').get('api');
                if (!apiHistory || !_.isArray(Array.from(apiHistory))) {
                    apiHistory = [];
                } else {
                    apiHistory = Array.from(apiHistory);
                }
                if (apiHistory.length > 3000) {
                    // send email to the oncokb dev account with the oldest 500 records
                    var historyToRemove = apiHistory.splice(0, 500);
                    sendEmail({sendTo: 'dev.oncokb@gmail.com', subject: 'OncoKB Review History', content: JSON.stringify(historyToRemove)},
                        function(result) {
                            console.log('sent old history to oncokb dev account');
                        },
                        function(error) {
                            console.log('fail to send old history to oncokb dev account', error);
                        }
                    );
                }
                apiHistory.push({
                    admin: user.name,
                    timeStamp: new Date().getTime(),
                    records: historyData
                });
                $rootScope.model.getRoot().get('history').set('api', apiHistory);
            }

            function lookupVariants(body) {
                var deferred = $q.defer();
                SearchVariant.lookupVariants(body)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(result) {
                        deferred.reject(result);
                    });
                return deferred.promise;
            }

            // Public API here
            return {
                getGeneAlterationTumorType: function(callback) {
                    var timestamp = new Date().getTime().toString();

                    numOfLocks[timestamp] = 3;
                    data[timestamp] = {};

                    getAllGene(function(d) {
                        data[timestamp].genes = d;
                    }, timestamp);
                    getAllAlteration(function(d) {
                        data[timestamp].alterations = d;
                    }, timestamp);
                    getAllTumorType(function(d) {
                        data[timestamp].tumorTypes = d;
                    }, timestamp);

                    timeout(callback, timestamp);
                },
                getGeneTumorType: function(callback) {
                    var timestamp = new Date().getTime().toString();

                    numOfLocks[timestamp] = 2;
                    data[timestamp] = {};

                    getAllGene(function(d) {
                        data[timestamp].genes = d;
                    }, timestamp);
                    getAllTumorType(function(d) {
                        data[timestamp].tumorTypes = d;
                    }, timestamp);

                    timeout(callback, timestamp);
                },
                getAllEvidence: getAllEvidence,
                getAllGene: getAllGene,
                getDataSummary: getDataSummary,
                searchAnnotation: searchVariant,
                googleDoc: generateGoogleDoc,
                createGoogleFolder: createGoogleFolder,
                getOncokbInfo: getOncokbInfo,
                getAllTumorType: getAllTumorType,
                updateGene: updateGene,
                updateGeneType: updateGeneType,
                updateEvidence: updateEvidence,
                deleteEvidences: deleteEvidences,
                updateVUS: updateVUS,
                updateEvidenceBatch: updateEvidenceBatch,
                updateEvidenceTreatmentPriorityBatch: updateEvidenceTreatmentPriorityBatch,
                sendEmail: sendEmail,
                getCacheStatus: getCacheStatus,
                disableCache: function() {
                    return setCache('disable');
                },
                enableCache: function() {
                    return setCache('enable');
                },
                resetCache: function() {
                    return setCache('reset');
                },
                updateGeneCache: function(hugoSymbol) {
                    return updateGeneCache(hugoSymbol);
                },
                getAllOncoTreeMainTypes: getAllOncoTreeMainTypes,
                getAllOncoTreeSubtypes: getAllOncoTreeSubtypes,
                getOncoTreeTumorTypesByMainType: getOncoTreeTumorTypesByMainType,
                testAccess: testAccess,
                getIsoforms: getIsoforms,
                getOncogeneTSG: getOncogeneTSG,
                getSuggestedVariants: getSuggestedVariants,
                isHotspot: isHotspot,
                getEvidencesByUUID: getEvidencesByUUID,
                getEvidencesByUUIDs: getEvidencesByUUIDs,
                getPubMedArticle: getPubMedArticle,
                getClinicalTrial: getClinicalTrial,
                getReviewedData: getReviewedData,
                lookupVariants: lookupVariants
            };
        }]);
