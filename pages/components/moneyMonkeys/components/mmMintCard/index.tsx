import styles from '../../../../../styles/Mm.module.css';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectCreateAccountState} from '../../../../../reduxStore/accountSlice';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from 'styled-components'; // requires a loader

const Image = styled.img`
  max-width: 400px;
  border-radius: 10px;
`

export const MmMintCard = () => {

    // @ts-ignore
    const {userData, web3Provider} = useSelector(
        selectCreateAccountState
    )

    return (
        <div className={styles.mintCard}>
            {/*<ToastContainer/>*/}
            <Carousel autoPlay={true} showArrows={false} showStatus={false} showIndicators={false} stopOnHover={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <Image src='/5.png' />
                </div>
                <div>
                    <Image src='/384.png' />
                </div>
                <div>
                    <Image src='/557.png' />
                </div>
                <div>
                    <Image src='/3584.png' />
                </div>
                <div>
                    <Image src='/458.png' />
                </div>
                <div>
                    <Image src='/2684.png' />
                </div>
                <div>
                    <Image src='/3186.png' />
                </div>
                <div>
                    <Image src='/1111.png' />
                </div>
                <div>
                    <Image src='/3618.png' />
                </div>
                <div>
                    <Image src='/2222.png' />
                </div>
                <div>
                    <Image src='/3485.png' />
                </div>
                <div>
                    <Image src='/4158.png' />
                </div>
            </Carousel>
            {/*<p className={styles.mintCardAnnouncement}>Eternal Cakes mint is Live!</p>*/}
            {/*<div className={styles.mintNumberContainer}>*/}
            {/*    <p className={styles.mintCardTotalMintedHeader}>{totalMinted}</p>*/}
            {/*    <img className={styles.mintNumberSeparator} src={verticalLine.src} alt=""/>*/}
            {/*    <p className={styles.mintCardTotalMintedHeader}>2222</p>*/}
            {/*</div>*/}
            {/*<div className={styles.mintCardAmounts}>*/}
            {/*    <div className={styles.mintCardNormalPrice}>*/}
            {/*        <p className={styles.mintCardTotalMinted}>Price</p>*/}
            {/*        <p className={styles.mintCardTotalMinted}>{price.toFixed(2)} BNB</p>*/}
            {/*    </div>*/}
            {/*    {*/}
            {/*        whitelistActive ?*/}
            {/*            <div className={styles.mintCardWhitelistPrice}>*/}
            {/*                <p className={styles.mintCardTotalMinted}>Whitelist Price</p>*/}
            {/*                <p className={styles.mintCardTotalMinted}>{whitelistPrice.toFixed(2)} BNB</p>*/}
            {/*            </div> : null*/}
            {/*    }*/}
            {/*</div>*/}
            {/*{*/}
            {/*    userData.walletConnected ?*/}
            {/*        <>*/}
            {/*            <div className={styles.mintCardAmountAdjustment}>*/}
            {/*                <p className={styles.mintCardTotalMinted}>Amount</p>*/}
            {/*                <div className={styles.mintCardAmountAdjustmentButtonContainer}>*/}
            {/*                    <button onClick={decreaseAmount} className={styles.amountAdjustmentButton}>*/}
            {/*                        <img className={styles.amountAdjustmentIcons} src={minusIcon.src} alt="+"/>*/}
            {/*                    </button>*/}
            {/*                    <p className={styles.mintCardTotalMinted}>&nbsp;&nbsp;&nbsp;{amount}&nbsp;&nbsp;&nbsp;</p>*/}
            {/*                    <button onClick={increaseAmount} className={styles.amountAdjustmentButton}>*/}
            {/*                        <img className={styles.amountAdjustmentIcons} src={plusIcon.src} alt="+"/>*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className={styles.mintCardWhitelistPrice}>*/}
            {/*                <p className={styles.mintCardTotalMinted}>Total</p>*/}
            {/*                <p className={styles.mintCardTotalMinted}>{(price * amount).toFixed(2)} BNB</p>*/}
            {/*            </div>*/}
            {/*            /!*<div className={styles.mintCardWhitelistPrice}>*!/*/}
            {/*            /!*    <p className={styles.mintCardTotalMinted}>Total (Whitelist)</p>*!/*/}
            {/*            /!*    <p className={styles.mintCardTotalMinted}>{(whitelistPrice * amount).toFixed(3)} BNB</p>*!/*/}
            {/*            /!*</div>*!/*/}
            {/*            <div className={styles.mintCardMintButtons}>*/}
            {/*                <button onClick={mint} className={styles.connectWalletButton}>*/}
            {/*                    {*/}
            {/*                        isLoading ? <Loader/> : <span>Mint</span>*/}
            {/*                    }*/}
            {/*                </button>*/}
            {/*                &nbsp;&nbsp;*/}
            {/*                {*/}
            {/*                    whitelistActive ?*/}
            {/*                        <button onClick={whitelistMint}*/}
            {/*                                className={styles.connectWalletButton}>*/}
            {/*                            {*/}
            {/*                                isWlLoading ? <Loader/> : <span>Whitelist Mint</span>*/}
            {/*                            }*/}
            {/*                        </button> : null*/}
            {/*                }*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*        :*/}
            {/*        <div className={styles.mintCardButtons}>*/}
            {/*            <p className={styles.mintCardAnnouncement}>Please Connect your wallet to mint!</p>*/}
            {/*        </div>*/}
            {/*}*/}
        </div>
    )
}

export default MmMintCard;
