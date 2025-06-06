import { useContext } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { ConfigContext } from '../../providers/config'
import Content from '../../components/Content'
import Container from '../../components/Container'
import { BoltzContext } from '../../providers/boltz'
import { WalletContext } from '../../providers/wallet'
import { prettyNumber } from '../../lib/format'

export default function About() {
  const { maxAllowedAmount, maxLiquidAmount } = useContext(BoltzContext)
  const { wallet } = useContext(WalletContext)

  const gitCommit = (import.meta.env.VITE_GIT_COMMIT ?? '').slice(0, 7)

  const maxAmount = {
    boltz: maxAllowedAmount(wallet),
    liquid: maxLiquidAmount(wallet),
  }

  const showSweepAll = wallet.initialized && maxAmount.liquid > 0

  const link = (name: string, url = '') => {
    if (!url) url = `https://${name}`
    return (
      <a className='underline cursor-pointer' href={url}>
        {name}
      </a>
    )
  }

  const { toggleShowConfig } = useContext(ConfigContext)
  return (
    <Container>
      <Content>
        <Title text='About' subtext='Helm wallet' />
        <div className='flex flex-col gap-6 mt-10'>
          <p>
            A Liquid wallet (for self-custody) that uses {link('Boltz', 'https://boltz.exchange')} swaps to disguise
            itself as a Lightning wallet that even your grandma can use
          </p>
          <p>
            Uses {link('mempool.space')} and {link('blockstream.info')} to fetch information from the chain
          </p>
          {showSweepAll ? (
            <p>
              To send all your funds,
              <br />
              create an invoice of <span className='font-semibold'>{prettyNumber(maxAmount.boltz)}</span> sats
              <br />
              (or <span className='font-semibold'>{prettyNumber(maxAmount.liquid)}</span> sats if other Helm wallet)
            </p>
          ) : null}
          <p>
            Made with 🧡 by{' '}
            {link('@bordalix', 'https://njump.me/npub1vt803quxxq32fuwkp42g2lyaw2t9qupvnl3z0vyc3s9kudkyhn8qt28cxv')}
            <br />
            {gitCommit ? (
              <>
                Git commit {link(gitCommit, 'https://github.com/bordalix/helm-wallet')}
                <br />
              </>
            ) : null}
            {link('FAQ', 'https://helm-wallet.com/#faq')}
          </p>
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={toggleShowConfig} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
