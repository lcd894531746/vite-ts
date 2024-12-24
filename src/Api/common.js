// 默认的主题色数组
const DEFAULT_COLORS = [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4'
];

// 不同图表类型的默认配置
const CHART_TYPE_OPTIONS = {
    // 折线图配置
    line: {
        title: {
            textStyle: {
                fontSize: 18,
                fontWeight: 'normal',
                color: '#fff'
            },
            left: 'center',
            top: '3%'
        },
        grid: {
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '12%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,25,50,0.9)',
            borderColor: '#0088FF',
            borderWidth: 1,
            textStyle: {
                color: '#E1E1E1',
                fontSize: 14
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#0088FF',
                    width: 1,
                    type: 'dashed'
                }
            }
        },
        xAxis: {
            axisLine: {
                lineStyle: {
                    color: '#0C2E64'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                color: "#90BEFF",
                fontSize: 12
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#0C2E64'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#90BEFF',
                fontSize: 12,
                margin: 12
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(93, 141, 224, 0.3)",
                    type: "dashed"
                }
            }
        },
        series: [{
            type: 'line',
            smooth: true,
            symbolSize: 6,
            symbol: 'circle',
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(0,153,255,0.7)' // 科技蓝渐变起始色
                    }, {
                        offset: 1,
                        color: 'rgba(0,102,255,0.1)' // 科技蓝渐变结束色
                    }]
                }
            },
            lineStyle: {
                width: 2.5,
                color: '#183FFF'
            },
            emphasis: {
                itemStyle: {
                    color: '#183FFF',
                    borderColor: '#00CCFF',
                    borderWidth: 2,
                    shadowColor: 'rgba(0,204,255,0.5)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                color: '#183FFF',
                borderColor: '#183FFF',
                borderWidth: 1
            }
        }]
    },

    // 柱状图配置
    bar: {
        title: {
            textStyle: {
                fontSize: 18,
                fontWeight: 'normal',
                color: '#fff'
            },
            left: 'center',
            top: '3%'
        },
        grid: {
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '12%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,25,50,0.9)',
            borderColor: '#0088FF',
            borderWidth: 1,
            textStyle: {
                color: '#E1E1E1',
                fontSize: 14
            },
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(24,63,255,0.1)'
                }
            }
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#0C2E64'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                color: "#90BEFF",
                fontSize: 12
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#0C2E64'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#90BEFF',
                fontSize: 12,
                margin: 12
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(93, 141, 224, 0.3)",
                    type: "dashed"
                }
            }
        },
        series: [{
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#00BFFF' // 亮蓝色
                    }, {
                        offset: 1,
                        color: '#0066FF' // 深蓝色
                    }]
                },
                borderRadius: [4, 4, 0, 0] // 柱状图顶部圆角
            },
            emphasis: {
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#00E0FF' // 高亮时更亮的蓝色
                        }, {
                            offset: 1,
                            color: '#0088FF' // 高亮时的深蓝色
                        }]
                    },
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,191,255,0.5)'
                }
            }
        }]
    },

    // 饼图配置
    pie: {
        title: {
            textStyle: {
                fontSize: 18,
                fontWeight: 'normal',
                color: '#fff'
            },
            left: 'center',
            top: '3%'
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,25,50,0.9)',
            borderColor: '#0088FF',
            borderWidth: 1,
            textStyle: {
                color: '#E1E1E1',
                fontSize: 14
            },
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            bottom: '5%',
            textStyle: {
                color: '#90BEFF',
                fontSize: 12
            },
            itemWidth: 10,
            itemHeight: 10,
            icon: 'circle'
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderColor: '#000',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff'
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0,191,255,0.5)'
                }
            },
            labelLine: {
                show: false
            },
            color: [
                {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#0066FF' // 纯蓝色
                    }, {
                        offset: 1,
                        color: 'rgba(0,102,255,0.8)'
                    }]
                },
                {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#00FFFF' // 青色
                    }, {
                        offset: 1,
                        color: 'rgba(0,255,255,0.8)'
                    }]
                },
                {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#00FF6E' // 翠绿色
                    }, {
                        offset: 1,
                        color: 'rgba(0,255,110,0.8)'
                    }]
                },
                {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#9F00FF' // 紫色
                    }, {
                        offset: 1,
                        color: 'rgba(159,0,255,0.8)'
                    }]
                },
                {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#FF3E96' // 粉红色
                    }, {
                        offset: 1,
                        color: 'rgba(255,62,150,0.8)'
                    }]
                }
            ]
        }]
    },

    // 散点图配置
    scatter: {
        color: DEFAULT_COLORS,
        title: {
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            },
            left: 'center'
        },
        grid: {
            top: '60px',
            left: '3%',
            right: '4%',
            bottom: '60px',
            containLabel: true
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: ({c})'
        }
    }
};

// 深度合并对象的辅助函数，customConfig 优先级更高
const deepMerge = (target, source, priorityMerge = false) => {
    for (let key in source) {
        // 处理 series 数组的特殊情况
        if (key === 'series' && Array.isArray(source[key])) {
            if (!target[key]) target[key] = [];
            source[key].forEach((item, index) => {
                if (!target[key][index]) {
                    target[key][index] = {};
                }
                // 确保自定义配置的优先级更高
                if (priorityMerge) {
                    target[key][index] = { ...item, ...target[key][index] };
                } else {
                    target[key][index] = { ...target[key][index], ...item };
                }
            });
            continue;
        }

        // 处理普通对象
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            target[key] = target[key] || {};
            deepMerge(target[key], source[key], priorityMerge);
        } else {
            // 如果是自定义配置合并，则不覆盖已有值
            if (priorityMerge && target[key] !== undefined) {
                continue;
            }
            target[key] = source[key];
        }
    }
    return target;
};

// 判断图表类型的函数
const getChartType = (option) => {
    // 通过配置特征判断图表类型
    console.log("option", option);
    if (option.series && Array.isArray(option.series)) {
        const mainSeries = option.series[0];
        if (!mainSeries) return null;
        console.log("mainSeries", mainSeries.type);
        // 判断图表类型
        switch (mainSeries.type) {
            case 'line':
                return 'line';
            case 'bar':
                return 'bar';
            case 'pie':
                return 'pie';
            case 'scatter':
                return 'scatter';
            default:
                return null;
        }
    }
    return null;
};

// 获取 ECharts 官方示例配置的函数
export const getEchartsOption = async (type) => {
    try {
        const response = await fetch(`/echarts/examples/examples/js/${type}.js`);
        const jsContent = await response.text();
      
        let option;
        const context = {
            option: null,
            setTimeout: () => { },
            setInterval: () => { },
            app: {
                title: '',
                titleCN: ''
            }
        };

        try {
            const code = `
                with (context) {
                    ${jsContent}
                    return option;
                }
            `;
            const fn = new Function('context', code);
            option = fn(context);

            // 判断图表类型
            const chartType = getChartType(option);
            console.log('检测到的图表类型:', chartType);

            // 如果能匹配到对应的图表类型配置，则进行合并
            if (chartType && CHART_TYPE_OPTIONS[chartType]) {
                const defaultOption = CHART_TYPE_OPTIONS[chartType];
                console.log('使用的默认配置:', defaultOption);

                // 修改合并策略：先用默认配置作为基础，然后合并原始配置
                const mergedOption = deepMerge(
                    JSON.parse(JSON.stringify(defaultOption)), // 默认配置作为基础
                    option,                                    // 合并原始配置
                    false                                      // 允许覆盖
                );

                console.log('合并后的配置:', mergedOption);
                return mergedOption;
            }

            console.log('未找到匹配的图表类型配置，使用原始配置');
            return option;
        } catch (error) {
            console.error('执行示例代码失败:', error);
            return null;
        }
    } catch (error) {
        console.error('获取示例代码失败:', error);
        return null;
    }
};

// 导出图表类型配置，以便需要时单独使用
export const chartTypeOptions = CHART_TYPE_OPTIONS;

// 智能合并 ECharts 配置的方法
export const mergeEChartsOption = (baseOption, customOption) => {
    // 如果没有基础配置，直接返回自定义配置
    if (!baseOption) return customOption;
    
    // 创建配置副本，避免修改原始对象
    const result = JSON.parse(JSON.stringify(baseOption));
    
    // 遍历自定义配置的每个键
    Object.keys(customOption).forEach(key => {
        // 特殊处理 title 等对象类型的配置
        if (typeof customOption[key] === 'object' && !Array.isArray(customOption[key])) {
            // 如果基础配置中存在该键，进行深度合并
            if (result[key] && typeof result[key] === 'object') {
                result[key] = {
                    ...result[key],
                    ...customOption[key]
                };
            } else {
                // 如果基础配置中不存在，直接赋值
                result[key] = customOption[key];
            }
        } else {
            // 对于非对象类型，直接覆盖
            result[key] = customOption[key];
        }
    });
    
    return result;
};

// 使用示例：
/*
const baseOption = {
    title: {
        text: "原标题",
        left: "center",
        textStyle: {
            color: "#fff"
        }
    },
    // 其他配置...
};

const customOption = {
    title: {
        text: "自定义标题",
        subtext: "副标题"
    }
};

const mergedOption = mergeEChartsOption(baseOption, customOption);
*/