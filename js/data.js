/**
 * ChemLab Pro — Data Module
 * All static data: classes, experiments, chemicals, reactions, equipment
 */

/* =================== CLASS DATA =================== */
const CLASSES = [
  { id:'c7',    name:'Class 7',  level:'Basic',        badge:'badge-basic', emoji:'📚', desc:'Foundation chemistry concepts',     expCount:4  },
  { id:'c8',    name:'Class 8',  level:'Basic',        badge:'badge-basic', emoji:'🔬', desc:'Simple & observation-based',         expCount:5  },
  { id:'c9',    name:'Class 9',  level:'Basic',        badge:'badge-basic', emoji:'⚗',  desc:'Fundamental chemistry',              expCount:6  },
  { id:'c10',   name:'Class 10', level:'Intermediate', badge:'badge-inter', emoji:'🧪', desc:'Board level basics',                 expCount:6  },
  { id:'c11',   name:'Class 11', level:'Intermediate', badge:'badge-inter', emoji:'🧫', desc:'Advanced basics & techniques',       expCount:7  },
  { id:'c12',   name:'Class 12', level:'Intermediate', badge:'badge-inter', emoji:'📐', desc:'Board practical level',              expCount:8  },
  { id:'bsc',   name:'B.Sc',     level:'Advanced',     badge:'badge-adv',   emoji:'🎓', desc:'Undergraduate level chemistry',      expCount:10 },
  { id:'btech', name:'B.Tech',   level:'Pro',          badge:'badge-pro',   emoji:'⚙',  desc:'Engineering chemistry',              expCount:12 },
];

/* =================== EXPERIMENTS =================== */
const EXPERIMENTS_BY_CLASS = {
  c7: [
    { icon:'🔥', name:'States of Matter',       sub:'Heating & Cooling',      desc:'Observe how matter changes between solid, liquid and gas states.',     tags:['Physical'],              concepts:['Melting point','Boiling point','Condensation'] },
    { icon:'💧', name:'Mixing Substances',       sub:'Solutions',              desc:'Explore what dissolves in water and what does not.',                   tags:['Observation'],           concepts:['Solute','Solvent','Solution'] },
    { icon:'🌈', name:'Separating Mixtures',     sub:'Filtration',             desc:'Use filtration and evaporation to separate mixtures.',                 tags:['Separation'],            concepts:['Filtration','Evaporation','Mixture'] },
    { icon:'🧂', name:'Properties of Acids & Bases', sub:'Litmus Test',       desc:'Test household substances with litmus paper.',                         tags:['Chemical'],              concepts:['pH','Litmus','Indicator'] },
  ],
  c8: [
    { icon:'🧂', name:'Separation of Mixtures', sub:'Filtration + Evaporation', desc:'Separate sand-salt mixture using filtration and evaporation.',        tags:['Separation','Physical'], concepts:['Filtration','Evaporation','Handpicking','Crystallization'] },
    { icon:'💧', name:'Solubility Test',         sub:'Salt & Sugar in Water',  desc:'Investigate solubility of different substances in water at varying temps.', tags:['Physical'],     concepts:['Solubility','Saturation','Temperature effect'] },
    { icon:'💎', name:'Crystallization',         sub:'Copper Sulphate Crystals', desc:'Grow beautiful copper sulphate crystals from saturated solution.',   tags:['Physical','Observation'], concepts:['Supersaturation','Crystal growth','Nucleation'] },
    { icon:'🔥', name:'Effect of Heat on Substances', sub:'Melting Wax',      desc:'Observe physical and chemical changes upon heating.',                  tags:['Physical','Chemical'],   concepts:['Physical change','Chemical change','Reversible/Irreversible'] },
    { icon:'🌡', name:'Acids & Bases',           sub:'Litmus Paper Test',      desc:'Identify acidic and basic solutions using indicators.',                tags:['Chemical'],              concepts:['Acid','Base','Neutral','Indicator'] },
  ],
  c9: [
    { icon:'🔀', name:'Mixture Separation',      sub:'Filtration + Distillation', desc:'Advanced separation using filtration and distillation techniques.',  tags:['Separation'],           concepts:['Distillation','Boiling point','Evaporation'] },
    { icon:'🌊', name:'Types of Solutions',      sub:'True Solution vs Colloid vs Suspension', desc:'Distinguish between true solutions, colloids, and suspensions.', tags:['Chemical'], concepts:['Tyndall effect','Particle size','Diffusion'] },
    { icon:'💨', name:'Diffusion Experiment',    sub:'Gaseous Diffusion',      desc:'Observe diffusion of gases and liquids across boundaries.',            tags:['Physical'],              concepts:['Diffusion','Concentration gradient','Brownian motion'] },
    { icon:'⚖', name:'Law of Conservation of Mass', sub:'Verification',       desc:'Verify that mass is conserved in chemical reactions.',                 tags:['Chemical','Quantitative'], concepts:['Conservation','Closed system','Balanced equation'] },
    { icon:'🔄', name:'Physical vs Chemical Change', sub:'Comparative Study', desc:'Identify and compare physical and chemical changes.',                  tags:['Observation'],           concepts:['Physical change','Chemical change','Irreversibility'] },
    { icon:'🧪', name:'Properties of Matter',   sub:'Density & Viscosity',    desc:'Measure and compare densities and viscosities of liquids.',            tags:['Physical'],              concepts:['Density','Viscosity','Buoyancy'] },
  ],
  c10: [
    { icon:'🌡', name:'pH Test of Substances',  sub:'pH Scale',               desc:'Measure pH of common substances and plot on pH scale.',                tags:['Chemical','Measurement'], concepts:['pH scale','Hydrogen ion concentration','Indicators'] },
    { icon:'⚡', name:'Electrolysis of Water',   sub:'H₂ + O₂ Production',    desc:'Electrolyze water to produce hydrogen and oxygen gases.',              tags:['Electrochemistry'],      concepts:['Electrolysis','Anode/Cathode','Faraday\'s law'] },
    { icon:'⚗', name:'Reactivity Series',       sub:'Metal Displacement',     desc:'Determine reactivity of metals using displacement reactions.',         tags:['Chemical'],              concepts:['Reactivity series','Displacement','Oxidation/Reduction'] },
    { icon:'🧪', name:'Properties of Acids & Bases', sub:'Comprehensive',     desc:'Study reactions of acids and bases with metals, oxides, carbonates.',  tags:['Chemical'],              concepts:['Neutralization','Salt formation','CO₂ detection'] },
    { icon:'💊', name:'Salt Preparation',        sub:'Titration Method',       desc:'Prepare pure salts by neutralization of acids and bases.',             tags:['Volumetric'],            concepts:['Titration','Equivalence point','Normality'] },
    { icon:'🔥', name:'Exothermic & Endothermic', sub:'Heat of Reaction',     desc:'Distinguish between exothermic and endothermic reactions.',            tags:['Thermochemistry'],       concepts:['Enthalpy','ΔH','Heat flow'] },
  ],
  c11: [
    { icon:'⚖', name:'Basic Lab Techniques',    sub:'Weighing & Measuring',   desc:'Master basic techniques of weighing, measuring volumes, handling glass.', tags:['Technique'],          concepts:['Significant figures','Precision','Accuracy'] },
    { icon:'🌡', name:'Melting & Boiling Point', sub:'Determination',          desc:'Determine melting and boiling points of pure substances.',             tags:['Physical'],              concepts:['Phase transition','Impurity effect','Capillary method'] },
    { icon:'📏', name:'Preparation of Standard Solution', sub:'Primary Standard', desc:'Prepare standard solution of oxalic acid.',                        tags:['Volumetric'],            concepts:['Molarity','Normality','Standard solution'] },
    { icon:'🌈', name:'Chromatography',          sub:'Paper & TLC',            desc:'Separate ink dyes using paper and thin-layer chromatography.',         tags:['Separation'],            concepts:['Rf value','Stationary/Mobile phase','Adsorption'] },
    { icon:'🧪', name:'Basic Titration',         sub:'Introduction',           desc:'Introduction to acid-base titration using phenolphthalein.',           tags:['Volumetric'],            concepts:['Burette','Equivalence point','Indicator selection'] },
    { icon:'🔬', name:'Functional Group Detection', sub:'Organic',             desc:'Detect functional groups using Baeyer\'s test, Tollens\', etc.',       tags:['Organic'],               concepts:['Aldehyde','Alkene','Hydroxyl group'] },
    { icon:'⚡', name:'Electrochemical Cell',    sub:'Galvanic Cell',          desc:'Build a simple galvanic cell using zinc and copper.',                  tags:['Electrochemistry'],      concepts:['EMF','Cell notation','Half-reactions'] },
  ],
  c12: [
    { icon:'⚗', name:'Acid–Base Titration',     sub:'NaOH vs HCl',            desc:'Standardize NaOH solution against standard HCl using phenolphthalein.', tags:['Volumetric','Quantitative'], concepts:['Normality','Back titration','Indicator selection'] },
    { icon:'🔴', name:'Redox Titration',         sub:'KMnO₄ vs FeSO₄',        desc:'Determine concentration using permanganate as self-indicator.',        tags:['Redox','Volumetric'],    concepts:['Oxidation number','Permanganometry','Equivalence point'] },
    { icon:'🔬', name:'Functional Group Identification', sub:'Organic Chemistry', desc:'Identify aldehydes, ketones, carboxylic acids and alcohols.',        tags:['Organic'],               concepts:['Fehling\'s test','Lucas test','Ester formation'] },
    { icon:'🧫', name:'Preparation of Organic Compounds', sub:'Ester Synthesis', desc:'Prepare ethyl acetate by Fischer esterification method.',            tags:['Organic','Synthesis'],   concepts:['Esterification','Reflux','Yield'] },
    { icon:'🌡', name:'pH Measurement',          sub:'Buffer Solutions',       desc:'Measure pH of buffer solutions and study Henderson-Hasselbalch.',      tags:['Physical','Quantitative'], concepts:['Buffer','pKa','Henderson-Hasselbalch'] },
    { icon:'⚡', name:'Conductivity Experiment', sub:'Electrolytic Solutions', desc:'Measure conductance of various electrolytic solutions.',               tags:['Electrochemistry'],      concepts:['Conductance','Molar conductivity','Kohlrausch law'] },
    { icon:'🔵', name:'Kohlrausch Law Verification', sub:'Limiting Molar Conductivity', desc:'Verify Kohlrausch law using weak electrolyte solutions.',      tags:['Electrochemistry'],      concepts:['Strong/Weak electrolyte','Λm°','Ion conductivity'] },
    { icon:'🧪', name:'Adsorption Isotherm',     sub:'Freundlich Isotherm',    desc:'Plot Freundlich adsorption isotherm for acetic acid on charcoal.',    tags:['Physical'],              concepts:['Adsorption','Freundlich','Surface chemistry'] },
  ],
  bsc: [
    { icon:'🧬', name:'Complexometric Titration', sub:'EDTA Method',          desc:'Determine hardness of water using EDTA complexometric titration.',     tags:['Advanced Volumetric'],   concepts:['EDTA','Chelate','Metal indicator','pM'] },
    { icon:'🌈', name:'UV-Visible Spectroscopy', sub:'Absorption Spectrum',   desc:'Record absorption spectrum of KMnO₄ and determine λmax.',             tags:['Spectroscopy','Instrumental'], concepts:['Beer-Lambert law','Absorbance','Molar absorptivity'] },
    { icon:'🔥', name:'Esterification Kinetics', sub:'Rate Study',            desc:'Study kinetics of Fischer esterification and determine rate constant.', tags:['Kinetics','Organic'],    concepts:['Rate law','Activation energy','Arrhenius equation'] },
    { icon:'⚡', name:'Polarography',            sub:'Electroanalysis',        desc:'Analyze metal ions using polarographic technique.',                    tags:['Electrochemistry','Instrumental'], concepts:['Polarography','Half-wave potential','Diffusion current'] },
    { icon:'🧪', name:'Viscometry',              sub:'Polymer Molecular Mass', desc:'Determine molecular mass of polymer by viscometry.',                  tags:['Physical','Polymer'],    concepts:['Viscosity','Mark-Houwink equation','Intrinsic viscosity'] },
    { icon:'🌡', name:'Phase Diagram Study',     sub:'Binary System',          desc:'Construct phase diagram for binary liquid mixture.',                  tags:['Physical','Thermodynamic'], concepts:['Eutectic point','Phase rule','Gibbs phase rule'] },
    { icon:'🔬', name:'Column Chromatography',   sub:'Separation of Dyes',    desc:'Separate colored compounds using silica gel column.',                 tags:['Separation','Organic'],  concepts:['Stationary phase','Elution','Rf value'] },
    { icon:'🧫', name:'Potentiometric Titration', sub:'Redox Titration',      desc:'Titrate FeSO₄ vs KMnO₄ potentiometrically.',                         tags:['Electrochemistry','Volumetric'], concepts:['Electrode potential','Equivalence point detection','Nernst equation'] },
    { icon:'🌊', name:'Surface Tension',         sub:'Drop Weight Method',     desc:'Measure surface tension of liquids using stalagmometer.',             tags:['Physical'],              concepts:['Surface tension','Adhesion','Capillary action'] },
    { icon:'💡', name:'Optical Rotation',        sub:'Polarimetry',            desc:'Measure optical rotation of sugar solution using polarimeter.',        tags:['Optical','Organic'],     concepts:['Chirality','Specific rotation','Polarimetry'] },
  ],
  btech: [
    { icon:'⚗', name:'Acid–Base Titration',     sub:'Engineering Applications', desc:'Determine acidity/alkalinity of industrial water samples.',          tags:['Volumetric','Industrial'], concepts:['Total acidity','Alkalinity','M-alkalinity','P-alkalinity'] },
    { icon:'💧', name:'Hardness of Water',       sub:'EDTA Method',            desc:'Determine total, temporary and permanent hardness of water.',         tags:['Volumetric','Water Chemistry'], concepts:['Temporary hardness','Permanent hardness','Boiler scale'] },
    { icon:'⚡', name:'Conductometric Titration', sub:'Strong Acid vs Strong Base', desc:'Determine equivalence point by conductometric method.',           tags:['Electrochemistry','Volumetric'], concepts:['Conductance','Equivalence point','Graph analysis'] },
    { icon:'📈', name:'Potentiometric Titration', sub:'pH vs Volume Curve',    desc:'Plot pH vs volume curve and find equivalence point.',                 tags:['Electrochemistry'],      concepts:['Electrode potential','Buffer region','Equivalence point'] },
    { icon:'🌊', name:'Dissolved Oxygen (DO)',   sub:'Winkler Method',         desc:'Determine dissolved oxygen content of water sample.',                 tags:['Environmental','Water Quality'], concepts:['DO','BOD','Winkler titration'] },
    { icon:'🧂', name:'Chloride Estimation',     sub:'Mohr\'s Method',         desc:'Determine chloride ion concentration by argentometric titration.',    tags:['Volumetric','Water'],    concepts:['Argentometry','Ksp','End point detection'] },
    { icon:'🌡', name:'pH Meter Experiment',     sub:'Calibration & Measurement', desc:'Calibrate pH meter and measure pH of industrial effluents.',        tags:['Instrumental'],          concepts:['Glass electrode','Buffer calibration','mV measurement'] },
    { icon:'🔵', name:'Viscosity Measurement',   sub:'Ostwald Viscometer',     desc:'Measure viscosity of lubricating oils at different temperatures.',    tags:['Physical','Industrial'], concepts:['Kinematic viscosity','Poiseuille\'s law','Viscosity index'] },
    { icon:'🧬', name:'Polymer Preparation',     sub:'Nylon-6,6 Synthesis',    desc:'Synthesize nylon-6,6 at interface of two immiscible liquids.',        tags:['Applied','Polymer'],     concepts:['Condensation polymer','Interfacial polymerization','Nylon rope trick'] },
    { icon:'🔴', name:'Corrosion Study',         sub:'Galvanic Corrosion',     desc:'Study galvanic corrosion of metals in saline solutions.',             tags:['Applied','Electrochemistry'], concepts:['Corrosion','Galvanic cell','Cathodic protection'] },
    { icon:'🌈', name:'Colorimetric Analysis',   sub:'Beer-Lambert Law',       desc:'Determine concentration of CuSO₄ by colorimetry.',                   tags:['Instrumental','Spectroscopy'], concepts:['Absorbance','Beer-Lambert law','Standard curve'] },
    { icon:'💡', name:'Flame Photometry',        sub:'Na & K Estimation',      desc:'Estimate sodium and potassium by flame photometry.',                  tags:['Instrumental','Analytical'], concepts:['Emission spectrum','Calibration curve','ppm'] },
  ]
};

/* =================== EQUIPMENT =================== */
const EQUIPMENT = [
  { name:'Graduated Cylinder', desc:'Measures liquid volumes accurately',     color:'#00d4ff', svgPath:'graduated' },
  { name:'Pipette',             desc:'Transfers precise small volumes',        color:'#a855f7', svgPath:'pipette'   },
  { name:'Burette',             desc:'Dispenses exact volumes for titration',  color:'#00ff88', svgPath:'burette'   },
  { name:'Volumetric Flask',    desc:'Prepares accurate standard solutions',   color:'#ffd60a', svgPath:'vol-flask' },
  { name:'Conical Flask',       desc:'Swirls liquids without splashing',       color:'#ff6b35', svgPath:'conical'   },
  { name:'Beaker',              desc:'Mixes, heats and stores liquids',        color:'#00d4ff', svgPath:'beaker'    },
  { name:'Test Tube',           desc:'Holds small samples for reactions',      color:'#a855f7', svgPath:'test-tube' },
  { name:'Bunsen Burner',       desc:'Open flame for heating reactions',       color:'#ff3366', svgPath:'bunsen'    },
  { name:'Analytical Balance',  desc:'Measures mass with extreme precision',   color:'#00ff88', svgPath:'balance'   },
  { name:'Ring Stand/Clamp',    desc:'Holds glassware for titrations',         color:'#ffd60a', svgPath:'ringstand' },
  { name:'Mortar & Pestle',     desc:'Crushes solids into powder',             color:'#c8d8f0', svgPath:'mortar'    },
  { name:'Watch Glass',         desc:'Covers beakers or holds samples',        color:'#00d4ff', svgPath:'watchglass'},
];

/* =================== CHEMICALS =================== */
const CHEMICALS = {
  'ACIDS': [
    { id:'HCl',       name:'Hydrochloric Acid', formula:'HCl',       color:'#ff4444', ph:0.5 },
    { id:'H2SO4',     name:'Sulfuric Acid',     formula:'H₂SO₄',     color:'#ff7700', ph:0.3 },
    { id:'HNO3',      name:'Nitric Acid',       formula:'HNO₃',      color:'#ffcc00', ph:0.5 },
    { id:'CH3COOH',   name:'Acetic Acid',       formula:'CH₃COOH',   color:'#ffee88', ph:3.0 },
    { id:'H3PO4',     name:'Phosphoric Acid',   formula:'H₃PO₄',     color:'#ffaa44', ph:1.5 },
    { id:'HF',        name:'Hydrofluoric Acid', formula:'HF',         color:'#ffaacc', ph:1.0 },
    { id:'H2CO3',     name:'Carbonic Acid',     formula:'H₂CO₃',     color:'#ffffaa', ph:4.5 },
  ],
  'BASES': [
    { id:'NaOH',      name:'Sodium Hydroxide',    formula:'NaOH',       color:'#4488ff', ph:13.5 },
    { id:'KOH',       name:'Potassium Hydroxide', formula:'KOH',        color:'#aa44ff', ph:13.5 },
    { id:'Ca(OH)2',   name:'Calcium Hydroxide',   formula:'Ca(OH)₂',   color:'#88aaff', ph:12.5 },
    { id:'NH3',       name:'Ammonia',             formula:'NH₃',        color:'#aaffee', ph:11.5 },
    { id:'Na2CO3',    name:'Sodium Carbonate',    formula:'Na₂CO₃',    color:'#88ccff', ph:11.5 },
    { id:'NaHCO3',    name:'Sodium Bicarbonate',  formula:'NaHCO₃',    color:'#66aaff', ph:8.5  },
    { id:'Mg(OH)2',   name:'Magnesium Hydroxide', formula:'Mg(OH)₂',   color:'#99bbff', ph:10.5 },
  ],
  'SALTS': [
    { id:'NaCl',      name:'Sodium Chloride',       formula:'NaCl',     color:'#ffffff', ph:7.0 },
    { id:'CuSO4',     name:'Copper Sulfate',         formula:'CuSO₄',   color:'#4499ff', ph:4.5 },
    { id:'FeSO4',     name:'Ferrous Sulfate',         formula:'FeSO₄',  color:'#66ff66', ph:4.0 },
    { id:'KMnO4',     name:'Potassium Permanganate', formula:'KMnO₄',   color:'#9933cc', ph:7.0 },
    { id:'Na2SO4',    name:'Sodium Sulfate',         formula:'Na₂SO₄',  color:'#aaddff', ph:7.0 },
    { id:'BaCl2',     name:'Barium Chloride',        formula:'BaCl₂',   color:'#eeddff', ph:6.5 },
  ],
  'INDICATORS': [
    { id:'Phenolphthalein', name:'Phenolphthalein',   formula:'C₂₀H₁₄O₄', color:'#ffaadd', ph:null },
    { id:'LitmusR',         name:'Litmus (Red)',       formula:'Litmus',     color:'#ff6666', ph:null },
    { id:'LitmusB',         name:'Litmus (Blue)',      formula:'Litmus',     color:'#6666ff', ph:null },
    { id:'MethylOrange',    name:'Methyl Orange',      formula:'MO',         color:'#ffaa44', ph:null },
    { id:'UnivIndicator',   name:'Universal Indicator',formula:'UI',         color:'#aaff44', ph:null },
  ],
  'METALS': [
    { id:'Zn',   name:'Zinc',         formula:'Zn', color:'#cccccc', ph:null },
    { id:'Fe',   name:'Iron',         formula:'Fe', color:'#888888', ph:null },
    { id:'Cu',   name:'Copper',       formula:'Cu', color:'#cc7744', ph:null },
    { id:'Mg',   name:'Magnesium',    formula:'Mg', color:'#dddddd', ph:null },
    { id:'Na_m', name:'Sodium Metal', formula:'Na', color:'#ffdd88', ph:null },
  ],
  'WATER': [
    { id:'H2O',  name:'Distilled Water',   formula:'H₂O',  color:'#aaddff', ph:7.0 },
    { id:'H2O2', name:'Hydrogen Peroxide', formula:'H₂O₂', color:'#eeeeff', ph:5.5 },
  ]
};

/* =================== REACTIONS =================== */
const REACTIONS = {
  'HCl+NaOH':       { eq:'HCl + NaOH → NaCl + H₂O',                                             type:'Neutralization',              pH:7.0,  color:'#aaddff', heat:'Exothermic',  ΔH:'-57.3 kJ/mol',   products:'NaCl + H₂O',              obs:'Clear solution, heat released',              GMW_product:58.44  },
  'HCl+KOH':        { eq:'HCl + KOH → KCl + H₂O',                                               type:'Neutralization',              pH:7.0,  color:'#aaddff', heat:'Exothermic',  ΔH:'-57.3 kJ/mol',   products:'KCl + H₂O',               obs:'Clear solution, heat released',              GMW_product:74.55  },
  'H2SO4+NaOH':     { eq:'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',                                     type:'Neutralization',              pH:7.0,  color:'#cceeFF', heat:'Exothermic',  ΔH:'-114.6 kJ/mol',  products:'Na₂SO₄ + H₂O',            obs:'Clear solution, significant heat',           GMW_product:142.04 },
  'HCl+Na2CO3':     { eq:'2HCl + Na₂CO₃ → 2NaCl + H₂O + CO₂↑',                                type:'Salt + Gas',                  pH:6.5,  color:'#eeffee', heat:'Exothermic',  ΔH:'-26.6 kJ/mol',   products:'NaCl + H₂O + CO₂↑',       obs:'Effervescence (CO₂ gas), clear soln',        GMW_product:44     },
  'HCl+NaHCO3':     { eq:'HCl + NaHCO₃ → NaCl + H₂O + CO₂↑',                                  type:'Effervescence',               pH:6.5,  color:'#eeffee', heat:'Endothermic', ΔH:'+3.6 kJ/mol',    products:'NaCl + CO₂ + H₂O',         obs:'Brisk effervescence of CO₂',                 GMW_product:44     },
  'HNO3+NaOH':      { eq:'HNO₃ + NaOH → NaNO₃ + H₂O',                                          type:'Neutralization',              pH:7.0,  color:'#aaddff', heat:'Exothermic',  ΔH:'-57.3 kJ/mol',   products:'NaNO₃ + H₂O',              obs:'Clear solution',                             GMW_product:85.00  },
  'CH3COOH+NaOH':   { eq:'CH₃COOH + NaOH → CH₃COONa + H₂O',                                   type:'Neutralization (Weak-Strong)', pH:8.9,  color:'#bbddff', heat:'Exothermic',  ΔH:'-56.1 kJ/mol',   products:'CH₃COONa + H₂O',           obs:'Slightly alkaline solution',                 GMW_product:82.03  },
  'CuSO4+NaOH':     { eq:'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',                                 type:'Precipitation',               pH:6.0,  color:'#4488ff', heat:'Exothermic',  ΔH:'-15 kJ/mol',     products:'Cu(OH)₂↓ + Na₂SO₄',        obs:'Blue precipitate forms immediately!',        GMW_product:97.56  },
  'BaCl2+Na2SO4':   { eq:'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl',                                   type:'Precipitation',               pH:7.0,  color:'#ffffff', heat:'Exothermic',  ΔH:'-22 kJ/mol',     products:'BaSO₄↓ + NaCl',            obs:'White precipitate of BaSO₄ forms',          GMW_product:233.39 },
  'Zn+HCl':         { eq:'Zn + 2HCl → ZnCl₂ + H₂↑',                                            type:'Metal-Acid Reaction',         pH:4.5,  color:'#eeffee', heat:'Exothermic',  ΔH:'-153 kJ/mol',    products:'ZnCl₂ + H₂↑',             obs:'Bubbles of H₂ gas, zinc dissolves',          GMW_product:136.28 },
  'Mg+HCl':         { eq:'Mg + 2HCl → MgCl₂ + H₂↑',                                            type:'Metal-Acid Reaction',         pH:4.0,  color:'#eeffee', heat:'Exothermic',  ΔH:'-467 kJ/mol',    products:'MgCl₂ + H₂↑',             obs:'Vigorous H₂ evolution, Mg disappears',       GMW_product:95.21  },
  'Na_m+H2O':       { eq:'2Na + 2H₂O → 2NaOH + H₂↑',                                           type:'Metal-Water Reaction',        pH:13.0, color:'#aaffee', heat:'Exothermic',  ΔH:'-368 kJ/mol',    products:'NaOH + H₂↑',               obs:'Violent reaction! Na floats, melts, moves',  GMW_product:40.00  },
  'H2O2+KMnO4':     { eq:'2KMnO₄ + 5H₂O₂ + 3H₂SO₄ → 2MnSO₄ + 5O₂↑ + 8H₂O + K₂SO₄',         type:'Redox',                       pH:3.5,  color:'#ffaa88', heat:'Exothermic',  ΔH:'-360 kJ/mol',    products:'MnSO₄ + O₂ + H₂O',         obs:'Purple colour disappears, O₂ gas evolved',   GMW_product:87     },
  'FeSO4+KMnO4':    { eq:'5FeSO₄ + KMnO₄ + H₂SO₄ → 5Fe₂(SO₄)₃ + MnSO₄ + K₂SO₄ + H₂O',      type:'Redox (Permanganometry)',      pH:2.0,  color:'#ffddbb', heat:'Exothermic',  ΔH:'-320 kJ/mol',    products:'Fe₂(SO₄)₃ + MnSO₄',        obs:'Pink/purple KMnO₄ decolourises',             GMW_product:278    },
};

/* =================== SVG EQUIPMENT RENDERER =================== */
/**
 * Generates an SVG element for the given equipment type.
 * @param {string} type - Equipment SVG path key
 * @param {string} color - Hex/CSS color for the equipment
 * @returns {string} SVG HTML string
 */
function makeEquipSVG(type, color) {
  const svgs = {
    'graduated': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="20" y="5" width="20" height="65" rx="3" fill="rgba(0,212,255,0.1)" stroke="${color}" stroke-width="1.5"/>
      <rect x="20" y="35" width="20" height="35" rx="2" fill="rgba(0,212,255,0.25)"/>
      ${[10,20,30,40,50,60].map(y=>`<line x1="25" y1="${y}" x2="40" y2="${y}" stroke="${color}" stroke-width="0.8" opacity="0.6"/><text x="22" y="${y+3}" font-size="5" fill="${color}" text-anchor="end" font-family="monospace">${(6-y/10)*10}</text>`).join('')}
      <rect x="25" y="70" width="10" height="5" rx="1" fill="${color}" opacity="0.5"/>
    </svg>`,
    'beaker': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 10 L10 60 Q10 70 20 70 L40 70 Q50 70 50 60 L50 10 Z" fill="rgba(0,212,255,0.08)" stroke="${color}" stroke-width="1.5"/>
      <path d="M10 45 L50 45 L50 60 Q50 70 40 70 L20 70 Q10 70 10 60 Z" fill="rgba(0,212,255,0.2)"/>
      <line x1="10" y1="10" x2="50" y2="10" stroke="${color}" stroke-width="1.5"/>
      <line x1="50" y1="10" x2="55" y2="5" stroke="${color}" stroke-width="1.5"/>
      ${[20,30,40].map(y=>`<line x1="45" y1="${y}" x2="50" y2="${y}" stroke="${color}" stroke-width="0.8" opacity="0.5"/>`).join('')}
    </svg>`,
    'test-tube': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22 5 L22 55 Q22 68 30 68 Q38 68 38 55 L38 5" fill="rgba(168,85,247,0.1)" stroke="${color}" stroke-width="1.5"/>
      <path d="M22 48 L38 48 L38 55 Q38 68 30 68 Q22 68 22 55 Z" fill="rgba(168,85,247,0.3)"/>
      <line x1="20" y1="5" x2="40" y2="5" stroke="${color}" stroke-width="1.5"/>
    </svg>`,
    'conical': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 8 L5 65 Q5 72 15 72 L45 72 Q55 72 55 65 Z" fill="rgba(255,107,53,0.08)" stroke="${color}" stroke-width="1.5"/>
      <path d="M18 50 L42 50 L45 65 Q45 72 30 72 Q15 72 15 65 Z" fill="rgba(255,107,53,0.25)"/>
      <line x1="26" y1="8" x2="34" y2="8" stroke="${color}" stroke-width="1.5"/>
    </svg>`,
    'burette': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="26" y="2" width="8" height="65" rx="2" fill="rgba(0,255,136,0.1)" stroke="${color}" stroke-width="1.5"/>
      <rect x="26" y="10" width="8" height="40" fill="rgba(0,255,136,0.2)"/>
      ${[10,20,30,40,50].map(y=>`<line x1="30" y1="${y}" x2="34" y2="${y}" stroke="${color}" stroke-width="0.8" opacity="0.6"/>`).join('')}
      <path d="M29 67 L31 67 L32 75 L28 75 Z" fill="${color}" opacity="0.6"/>
      <line x1="30" y1="75" x2="30" y2="79" stroke="${color}" stroke-width="1.5"/>
    </svg>`,
    'pipette': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="30" cy="20" rx="10" ry="14" fill="rgba(168,85,247,0.1)" stroke="${color}" stroke-width="1.5"/>
      <ellipse cx="30" cy="20" rx="10" ry="10" fill="rgba(168,85,247,0.2)"/>
      <line x1="30" y1="34" x2="30" y2="72" stroke="${color}" stroke-width="1.8"/>
      <path d="M28 72 L32 72 L30 78 Z" fill="${color}"/>
    </svg>`,
    'vol-flask': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 32 L10 62 Q8 72 20 72 L40 72 Q52 72 50 62 Z" fill="rgba(255,213,10,0.08)" stroke="${color}" stroke-width="1.5"/>
      <path d="M14 57 L46 57 L46 62 Q44 72 30 72 Q16 72 14 62 Z" fill="rgba(255,213,10,0.25)"/>
      <line x1="26" y1="5" x2="34" y2="5" stroke="${color}" stroke-width="1.5"/>
      <line x1="30" y1="5" x2="30" y2="32" stroke="${color}" stroke-width="1.5"/>
    </svg>`,
    'bunsen': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="20" y="30" width="20" height="35" rx="4" fill="rgba(255,51,102,0.1)" stroke="${color}" stroke-width="1.5"/>
      <rect x="25" y="65" width="10" height="8" rx="2" fill="${color}" opacity="0.5"/>
      <line x1="25" y1="50" x2="20" y2="50" stroke="${color}" stroke-width="1.5"/>
      <path d="M30 30 Q28 18 30 8 Q32 18 30 30" fill="rgba(255,150,0,0.6)" stroke="rgba(255,80,0,0.8)" stroke-width="0.5"/>
      <path d="M30 28 Q29 20 30 14 Q31 20 30 28" fill="rgba(255,220,0,0.7)"/>
    </svg>`,
    'balance': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="65" width="50" height="6" rx="2" fill="${color}" opacity="0.4"/>
      <line x1="30" y1="10" x2="30" y2="65" stroke="${color}" stroke-width="2"/>
      <line x1="10" y1="25" x2="50" y2="25" stroke="${color}" stroke-width="1.5"/>
      <line x1="10" y1="25" x2="10" y2="38" stroke="${color}" stroke-width="1"/>
      <line x1="50" y1="25" x2="50" y2="38" stroke="${color}" stroke-width="1"/>
      <ellipse cx="10" cy="40" rx="8" ry="3" fill="rgba(0,255,136,0.1)" stroke="${color}" stroke-width="1"/>
      <ellipse cx="50" cy="40" rx="8" ry="3" fill="rgba(0,255,136,0.1)" stroke="${color}" stroke-width="1"/>
    </svg>`,
    'ringstand': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="15" y1="5" x2="15" y2="75" stroke="${color}" stroke-width="3"/>
      <rect x="5" y="70" width="30" height="8" rx="2" fill="${color}" opacity="0.4"/>
      <line x1="15" y1="30" x2="40" y2="30" stroke="${color}" stroke-width="2"/>
      <ellipse cx="46" cy="30" rx="8" ry="8" fill="none" stroke="${color}" stroke-width="1.5"/>
    </svg>`,
    'mortar': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 45 Q8 65 30 65 Q52 65 50 45 Z" fill="rgba(200,216,240,0.1)" stroke="${color}" stroke-width="1.5"/>
      <line x1="10" y1="45" x2="50" y2="45" stroke="${color}" stroke-width="1.5"/>
      <line x1="36" y1="12" x2="30" y2="45" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="36" cy="12" rx="4" ry="6" fill="${color}" opacity="0.4"/>
    </svg>`,
    'watchglass': `<svg class="equip-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 40 Q30 20 55 40" fill="rgba(0,212,255,0.1)" stroke="${color}" stroke-width="2"/>
      <line x1="5" y1="40" x2="55" y2="40" stroke="${color}" stroke-width="1" opacity="0.3"/>
    </svg>`,
  };
  return svgs[type] || svgs['beaker'];
}

/**
 * Generates the SVG for a beaker on the lab bench.
 * @param {string} color - Hex color for the liquid
 * @param {number} size - Width in px
 * @param {boolean} heatOn - Whether burner is active (shows bubbles)
 * @returns {string} SVG HTML string
 */
function makeBeakerSVG(color, size, heatOn) {
  const h = size * 1.2;
  return `<svg width="${size}" height="${h}" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 12 L8 72 Q8 84 20 84 L60 84 Q72 84 72 72 L72 12 Z" fill="rgba(255,255,255,0.04)" stroke="${color}" stroke-width="2"/>
    <path d="M8 48 L72 48 L72 72 Q72 84 60 84 L20 84 Q8 84 8 72 Z" fill="${color}44"/>
    <line x1="8" y1="48" x2="72" y2="48" stroke="${color}" stroke-width="1" opacity="0.7"/>
    <line x1="64" y1="28" x2="72" y2="28" stroke="${color}" stroke-width="1" opacity="0.5"/>
    <line x1="64" y1="38" x2="72" y2="38" stroke="${color}" stroke-width="1" opacity="0.5"/>
    <line x1="64" y1="58" x2="72" y2="58" stroke="${color}" stroke-width="1" opacity="0.5"/>
    <line x1="64" y1="68" x2="72" y2="68" stroke="${color}" stroke-width="1" opacity="0.5"/>
    <line x1="8" y1="12" x2="72" y2="12" stroke="${color}" stroke-width="2"/>
    <line x1="72" y1="12" x2="78" y2="6" stroke="${color}" stroke-width="2"/>
    ${heatOn ? `<circle cx="25" cy="60" r="2" fill="${color}" opacity="0.6"/><circle cx="40" cy="55" r="1.5" fill="${color}" opacity="0.4"/><circle cx="55" cy="62" r="1" fill="${color}" opacity="0.5"/>` : ''}
  </svg>`;
}
