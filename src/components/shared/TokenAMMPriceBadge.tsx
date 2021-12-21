import { LoadingOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { ThemeContext } from 'contexts/themeContext'
import { useTokenAMMPriceQuery } from 'hooks/ERC20AMMPrice'
import { formattedNum } from 'utils/formatNumber'
import UniswapLogo from 'components/icons/Uniswap'

type exchangeName = 'uniswap'

// const LOGOS: { [K in exchangeName]: JSX.Element } = {
const LOGOS = {
  uniswap: UniswapLogo,
}

type Props = {
  exchangeName: exchangeName
}

export default function TokenAMMPriceBadge({ exchangeName }: Props) {
  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const { data: priceData } = useTokenAMMPriceQuery()
  const { projectTokenSymbol, ETHPrice } = priceData || {}
  const Logo = LOGOS[exchangeName]

  return (
    <span
      style={{
        padding: '0 0.5rem',
        borderRadius: 100,
        border: `1px solid ${colors.stroke.secondary}`,
        fontSize: '0.7rem',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <span style={{ marginRight: '0.25rem' }}>
        <Logo size={20} />
      </span>
      {priceData ? (
        `${formattedNum(ETHPrice?.toFixed(0))} ${projectTokenSymbol}/ETH`
      ) : (
        <LoadingOutlined />
      )}
    </span>
  )
}
