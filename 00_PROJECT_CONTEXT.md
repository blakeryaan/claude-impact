# Claude Impact Lab — Project Context

---

## Hackathon

- **Event:** Claude Impact Lab, Melbourne  
- **Date:** 23 May 2026  
- **Hackathon page:** [https://campaign.glowfeed.com/claude-impact-lab/](https://campaign.glowfeed.com/claude-impact-lab/)

---

## Problem Statement (exact wording)

**Theme:** Community & citizen initiatives — Resilience built from the ground up by residents and communities.

"How might residents and communities drive their own solutions — from circular economy models to local resource sharing — that build resilience from the ground up?"

---

## What Judges Are Looking For

- Real civic impact — a Melburnian's life is measurably better  
- Council could plausibly adopt it  
- Equity must show up  
- "Puts Melbourne on the map" — uses what Melbourne is uniquely famous for, something no other city could replicate in the same way

---

## Data Sources

### 1\. Glow / Global Market Signals — SDG Demand Data Pack

- **Landing page:** [https://campaign.glowfeed.com/claude-impact-lab/](https://campaign.glowfeed.com/claude-impact-lab/)  
- **What it is:** Survey data on SDG awareness and priorities from 12,268 Australians across 3 waves (Jul–Sep 2025, Oct–Dec 2025, Jan–Mar 2026\)  
- **File uploaded:** `SDG_Awareness_AU_Combined_gmsmarketsignals_com.csv`  
- **Cached (this session):**  
  - `/home/claude/glow/glow_clean.pkl` — full AU dataset, cleaned column names  
  - `/home/claude/glow/glow_melbourne.pkl` — Melbourne respondents only (n=2,492)  
  - `/home/claude/glow/glow_victoria.pkl` — Melbourne \+ Regional Vic (n=3,236)

#### Dataset structure (27 columns per respondent)

| Column | Values |
| :---- | :---- |
| WAVE | JUL-SEP, OCT-DEC, JAN-MAR |
| age | 18-24, 25-34, 35-44, 45-54, 55-64, 65+ |
| gender | Male, Female, Non-binary, etc. |
| location | Melbourne, Regional/Rural Victoria, Sydney, Brisbane, etc. |
| income | \<$20k through $200k+ bands |
| children | Number of children under 18 |
| sdg\_aware | Yes / No |
| Good health (+ 16 other SDG columns) | Yes / No — whether in respondent's top 3 |
| switched\_brand | Yes / No / Don't Know — brand switching in last 3 months for social/env reasons |

#### Location breakdown (total n=12,268)

| Location | n |
| :---- | :---- |
| Sydney | 2,575 |
| **Melbourne** | **2,492** |
| Regional/Rural NSW | 1,296 |
| Brisbane | 1,233 |
| Regional/Rural Queensland | 1,199 |
| Perth | 1,040 |
| **Regional/Rural Victoria** | **744** |
| Adelaide | 650 |
| ACT/Canberra | 244 |
| Others | 484 |

---

### 2\. City of Melbourne Open Data Portal

- **Portal home:** [https://data.melbourne.vic.gov.au/pages/home/](https://data.melbourne.vic.gov.au/pages/home/)  
- **Explore all datasets:** [https://data.melbourne.vic.gov.au/explore/](https://data.melbourne.vic.gov.au/explore/)

#### Key datasets and direct API/export URLs

**Pedestrian Counting System — Sensor Locations**

- Portal: [https://data.melbourne.vic.gov.au/explore/dataset/pedestrian-counting-system-sensor-locations/](https://data.melbourne.vic.gov.au/explore/dataset/pedestrian-counting-system-sensor-locations/)  
- CSV export: [https://data.melbourne.vic.gov.au/api/v2/catalog/datasets/pedestrian-counting-system-sensor-locations/exports/csv?delimiter=](https://data.melbourne.vic.gov.au/api/v2/catalog/datasets/pedestrian-counting-system-sensor-locations/exports/csv?delimiter=),  
- Contains: location\_id, sensor name, lat/lng, install date, indoor/outdoor, directional info, status

**Pedestrian Counting System — Counts Per Hour (2009–present)**

- Portal: [https://data.melbourne.vic.gov.au/explore/dataset/pedestrian-counting-system-monthly-counts-per-hour/](https://data.melbourne.vic.gov.au/explore/dataset/pedestrian-counting-system-monthly-counts-per-hour/)  
- CSV export: [https://data.melbourne.vic.gov.au/api/v2/catalog/datasets/pedestrian-counting-system-monthly-counts-per-hour/exports/csv?delimiter=](https://data.melbourne.vic.gov.au/api/v2/catalog/datasets/pedestrian-counting-system-monthly-counts-per-hour/exports/csv?delimiter=),  
- Contains: hourly pedestrian counts per sensor, updated monthly

**Pedestrian Counting System — Past Hour (counts per minute, live)**

- Portal: [https://data.melbourne.vic.gov.au/explore/dataset/pedestrian-counting-system-past-hour-counts-per-minute/export/](https://data.melbourne.vic.gov.au/explore/dataset/pedestrian-counting-system-past-hour-counts-per-minute/export/)  
- Updated every 15 minutes

**Trees with Species and Dimensions — Urban Forest**

- Portal: [https://data.melbourne.vic.gov.au/explore/dataset/trees-with-species-and-dimensions-urban-forest/](https://data.melbourne.vic.gov.au/explore/dataset/trees-with-species-and-dimensions-urban-forest/)  
- CSV export: [https://data.melbourne.vic.gov.au/api/v2/catalog/datasets/trees-with-species-and-dimensions-urban-forest/exports/csv?delimiter=](https://data.melbourne.vic.gov.au/api/v2/catalog/datasets/trees-with-species-and-dimensions-urban-forest/exports/csv?delimiter=),  
- Contains: 80,000+ trees, species, canopy diameter, useful life expectancy, lat/lng, precinct  
- Interactive map: [http://melbourneurbanforestvisual.com.au/](http://melbourneurbanforestvisual.com.au/)

**Microclimate Sensor Readings (live, updated every 15 min)**

- Portal: [https://data.melbourne.vic.gov.au/explore/dataset/microclimate-sensors-data/](https://data.melbourne.vic.gov.au/explore/dataset/microclimate-sensors-data/)  
- Contains: ambient temperature, relative humidity, atmospheric pressure, wind speed/direction, particulate matter (PM2.5, PM10), noise

**Microclimate Sensor Readings — Historical**

- Portal: [https://data.melbourne.vic.gov.au/explore/dataset/microclimate-sensor-readings/](https://data.melbourne.vic.gov.au/explore/dataset/microclimate-sensor-readings/)  
- CSV export: [https://data.melbourne.vic.gov.au/api/v2/catalog/datasets/microclimate-sensor-readings/exports/csv?delimiter=](https://data.melbourne.vic.gov.au/api/v2/catalog/datasets/microclimate-sensor-readings/exports/csv?delimiter=),

**Microclimate Sensor Locations**

- Portal: [https://data.melbourne.vic.gov.au/explore/dataset/microclimate-sensor-locations/](https://data.melbourne.vic.gov.au/explore/dataset/microclimate-sensor-locations/)

**Drinking Fountains**

- Portal: [https://data.melbourne.vic.gov.au/explore/dataset/drinking-fountains/](https://data.melbourne.vic.gov.au/explore/dataset/drinking-fountains/)  
- DataVic mirror: [https://discover.data.vic.gov.au/dataset/drinking-fountains](https://discover.data.vic.gov.au/dataset/drinking-fountains)  
- Contains: description, type, geo location of all drinking fountains in CoM

---

### 3\. Victorian Government Open Data Portal (state-wide)

- **Portal home:** [https://www.data.vic.gov.au/](https://www.data.vic.gov.au/)  
- **Search:** [https://discover.data.vic.gov.au/](https://discover.data.vic.gov.au/)  
- **Themes available:** Planning, Transport, Vicmap spatial, Education, Environment, Community  
- Covers all 79 Victorian councils (metro \+ rural)

---

## Glow Data — Key Numbers (computed from the CSV)

### SDG Awareness

| Geography | % aware of SDGs |
| :---- | :---- |
| Melbourne | 29.1% |
| Regional / Rural Victoria | 18.4% |
| All Australia | 25.8% |

### Melbourne SDG Priority Rankings (% ranking in personal top 3, n=2,492)

| Rank | SDG | % |
| :---- | :---- | :---- |
| 1 | Good health | 29.8% |
| 2 | No poverty | 29.8% |
| 3 | Clean water and sanitation | 29.5% |
| 4 | Zero hunger | 26.4% |
| 5 | Climate action | 22.2% |
| 6 | Affordable and clean energy | 22.1% |
| 7 | Quality education | 18.1% |
| 8 | Peace, justice and strong institutions | 17.5% |
| 9 | Decent work and economic growth | 14.6% |
| 10 | Gender equality | 11.9% |
| 11 | Sustainable cities and communities | 11.4% |
| 12 | Life below water | 9.8% |
| 13 | Life on land | 9.7% |
| 14 | Responsible consumption and production | 8.1% |
| 15 | Reduced inequalities | 7.2% |
| 16 | Industry, innovation, and infrastructure | 5.6% |
| 17 | Partnerships for the goals | 2.7% |

### Regional / Rural Victoria SDG Priority Rankings (n=744)

| Rank | SDG | % |
| :---- | :---- | :---- |
| 1 | Clean water and sanitation | 33.9% |
| 2 | No poverty | 32.0% |
| 3 | Good health | 31.6% |
| 4 | Zero hunger | 26.1% |
| 5 | Affordable and clean energy | 25.0% |
| 6 | Climate action | 21.2% |

### Melbourne — Brand Switching Behaviour (Q19)

| Response | % |
| :---- | :---- |
| No | 73.7% |
| Yes — switched brand for social/env reasons (last 3 months) | 18.4% |
| Don't know | 7.9% |

### Climate Action priority in Melbourne — who are they?

- n \= 554 Melburnians (22.2% of Melbourne sample)  
- **By age:** 25–34 (21.5%), 45–54 (18.6%), 35–44 (18.4%), 18–24 (15.7%), 65+ (13.0%), 55–64 (12.8%)  
- **By income:** $100–149k (24.2%), $75–99k (18.2%), $50–74k (16.2%), $150–199k (11.6%)

### Good Health priority in Melbourne — who are they?

- n \= 743 Melburnians (29.8% of Melbourne sample)  
- **By age:** 25–34 (23.0%), 35–44 (19.0%), 45–54 (18.7%), 18–24 (14.5%), 55–64 (12.8%), 65+ (12.0%)

---

*Context assembled: 23 May 2026\. Claude Impact Lab Hackathon, Melbourne.*  
