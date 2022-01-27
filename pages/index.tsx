import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { BaseLayout } from 'components/BaseLayout'
import { Card } from 'components/Card'
import { ChangeRate } from 'components/ChangeRate'
import { Container } from 'components/Container'
import { Hero } from 'components/Hero'
import { Icon } from 'components/Icon'
import { LayoutedContent } from 'components/LayoutedContent'
import { List } from 'components/List'
import { ListItem } from 'components/ListItem'
import { Lead } from 'components/Lead'
import { Title } from 'components/Title'
import { LineChart } from 'components/LineChart'
import { PieChart } from 'components/PieChart'
import { MetricsAPI } from 'src/metrics/api'
import { DailyPrice, Metrics } from 'src/metrics'
import { useNumberFormat } from 'src/number-format'

import styles from './home.module.css'

type Props = {
  dailyPrice: DailyPrice;
  metrics: Metrics;
}
const Home: NextPage<Props> = ({ dailyPrice, metrics }) => {

  const { numberFormat } = useNumberFormat();

  const changeRate = dailyPrice[dailyPrice.length - 1].price;
  const changeRateRelative = ((dailyPrice[dailyPrice.length - 1].price - dailyPrice[0].price) / dailyPrice[0].price) * 100;

  return (
    <BaseLayout>
      <Head>
        <link rel="preload" href="/fonts/TT-Commons-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/TT-Commons-DemiBold.woff2" as="font" type="font/woff2" crossOrigin="" />

        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero>
        <Container>
          <Title className={styles.Title}>CHSB Performance Metrics</Title>
          <Lead className={styles.Lead}>
            Deep-dive into the statistics of CHSB and understand the mechanics of the full SwissBorg Ecosystem.
          </Lead>
          <Card
            className={styles.Card}
            header={(
              <ChangeRate
                currencyFrom="USD"
                currencyTo="CHSB"
                text={numberFormat(changeRate, 'currency')}
                percentage={`${numberFormat(changeRateRelative, 'percent')} 24Hours`}
              />
            )}
          >
            <LineChart data={dailyPrice} />
          </Card>
          <div className="text-center">
            <Icon className={styles.ArrowDown} name="arrow-down" />
          </div>
        </Container>
      </Hero>
      <Container className={styles.Content}>
        <h2 className={styles.SectionTitle}>A breakdown of CHSB&rsquo;s circulating supply</h2>
        <LayoutedContent mobileInverted>
          <List>
            <ListItem
              iconName="supply"
              label="Remaining circulating supply"
              text={numberFormat(metrics.chsbCirculatingSupplyTokens)}
            />
            <ListItem
              iconName="diamond"
              label="CHSB Staked"
              text={(
                <React.Fragment>
                  <p className="Subheadline font-size-26">{numberFormat(metrics.chsbStackedTokens)}</p>
                  <p className={styles.CirculatingSupply}>(<b>{numberFormat(metrics.chsbStackedPercentage, 'percentAbsolute')}</b> of Circulating supply)</p>
                </React.Fragment>
              )}
            />
            <ListItem
              iconName="yield"
              label="CHSB in Smart Yield"
              text={(
                <>
                  <p className="Subheadline font-size-26">{numberFormat(metrics.chsbYieldPledgedTokens)}</p>
                  <p className={styles.CirculatingSupply}>(<b>{numberFormat(metrics.chsbInYieldPercentage, 'percentAbsolute')}</b> of Circulating supply)</p>
                </>
              )}
            />
            <ListItem
              iconName="burned"
              label="Circulating supply burned"
              text={numberFormat(metrics.chsbBurnedTokens)}
            />
            <ListItem
              iconName="buyback"
              label="CHSB in buyback pool"
              text="13,456"
            />
          </List>
          <PieChart data={metrics} />
        </LayoutedContent>
      </Container>
    </BaseLayout>
  )
}

export async function getServerSideProps() {

  const dailyPrice = await MetricsAPI.getDailyPrice();

  const metrics = await MetricsAPI.getMetrics();

  return {
    props: { dailyPrice, metrics },
  }
}

export default Home
