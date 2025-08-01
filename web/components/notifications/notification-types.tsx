import { GiftIcon, StarIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { TRADED_TERM } from 'common/envs/constants'
import {
  AirdropData,
  BetFillData,
  BetReplyNotificationData,
  ContractResolutionData,
  ExtraPurchasedManaData,
  getSourceUrl,
  Notification,
  PaymentCompletedData,
  ReactionNotificationTypes,
  ReviewNotificationData,
} from 'common/notification'
import {
  MANIFOLD_AVATAR_URL,
  MANIFOLD_USER_NAME,
  MANIFOLD_USER_USERNAME,
} from 'common/user'
import { formatMoney, formatMoneyUSD } from 'common/util/format'
import { floatingEqual } from 'common/util/math'
import { WeeklyPortfolioUpdate } from 'common/weekly-portfolio-update'
import { sortBy } from 'lodash'
import Link from 'next/link'
import { useState } from 'react'
import { BsBank } from 'react-icons/bs'
import { Col } from 'web/components/layout/col'
import { Row } from 'web/components/layout/row'
import { MultiUserReactionModal } from 'web/components/multi-user-reaction-link'
import {
  BettingStreakBonusIncomeNotification,
  BettingStreakExpiringNotification,
  LeagueChangedNotification,
  LoanIncomeNotification,
  ManaPaymentReceivedNotification,
  PushNotificationBonusNotification,
  QuestIncomeNotification,
  ReferralNotification,
  UniqueBettorBonusIncomeNotification,
  UniqueBettorNotification,
} from 'web/components/notifications/income-summary-notifications'
import {
  BinaryOutcomeLabel,
  MultiLabel,
  NumericValueLabel,
  OutcomeLabel,
  ProbPercentLabel,
} from 'web/components/outcome-label'
import { Avatar } from 'web/components/widgets/avatar'
import { useReview } from 'web/hooks/use-review'
import { SpiceCoin } from 'web/public/custom-components/spiceCoin'
import { Button } from '../buttons/button'
import { Modal } from '../layout/modal'
import { Rating, ReviewPanel } from '../reviews/stars'
import { TokenNumber } from '../widgets/token-number'
import { Linkify } from '../widgets/linkify'
import { linkClass } from '../widgets/site-link'
import {
  AvatarNotificationIcon,
  NOTIFICATION_ICON_SIZE,
  NotificationFrame,
  NotificationIcon,
  NotificationTextLabel,
  NotificationUserLink,
  PrimaryNotificationLink,
  QuestionOrGroupLink,
} from './notification-helpers'
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6'
import { api } from 'web/lib/api/api'
import { removeUndefinedProps } from 'common/util/object'
import toast from 'react-hot-toast'
import { NewPostFromFollowedUserNotification } from './followed-post-notification'

export function NotificationItem(props: {
  notification: Notification
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup } = props
  const { sourceType, reason, sourceUpdateType } = notification

  const [highlighted, setHighlighted] = useState(!notification.isSeen)
  if (reason === 'unique_bettors_on_your_contract' && sourceType === 'bonus') {
    return (
      <UniqueBettorBonusIncomeNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (reason === 'unique_bettors_on_your_contract') {
    return (
      <UniqueBettorNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'admin' && sourceType === 'contract') {
    return (
      <AIDescriptionUpdateNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (sourceType === 'push_notification_bonus') {
    return (
      <PushNotificationBonusNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (sourceType === 'quest_reward') {
    return (
      <QuestIncomeNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (sourceType === 'betting_streak_bonus') {
    return (
      <BettingStreakBonusIncomeNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (sourceType === 'betting_streak_expiring') {
    return (
      <BettingStreakExpiringNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'loan_income') {
    return (
      <LoanIncomeNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'mana_payment_received') {
    return (
      <ManaPaymentReceivedNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'payment_status') {
    return (
      <PaymentSuccessNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'bounty_added') {
    return (
      <BountyAddedNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (reason === 'bounty_canceled') {
    return (
      <BountyCanceledNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (sourceType === 'user' && sourceUpdateType === 'updated') {
    return (
      <ReferralNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (reason === 'bet_fill') {
    return (
      <BetFillNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (
    reason === 'limit_order_cancelled' &&
    sourceUpdateType === 'updated'
  ) {
    return (
      <LimitOrderCancelledNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (
    reason === 'limit_order_cancelled' &&
    sourceUpdateType === 'expired'
  ) {
    return (
      <LimitOrderExpiredNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (sourceType === 'post' && sourceUpdateType === 'created') {
    return (
      <NewPostFromFollowedUserNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'contract_from_followed_user') {
    return (
      <NewMarketNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (sourceType === 'comment' || sourceType === 'love_comment') {
    return (
      <CommentNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'tagged_user') {
    return (
      <TaggedUserNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (sourceType === 'bet_reply') {
    return (
      <BetReplyNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'bounty_awarded') {
    return (
      <BountyAwardedNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (
    reason === 'vote_on_your_contract' ||
    reason === 'all_votes_on_watched_markets'
  ) {
    return (
      <VotedNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (
    reason == 'poll_close_on_watched_markets' ||
    reason == 'your_poll_closed'
  ) {
    return (
      <PollClosedNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (
    (sourceType === 'contract' || sourceType === 'love_contract') &&
    sourceUpdateType === 'updated'
  ) {
    return null
  } else if (
    (sourceType === 'contract' || sourceType === 'love_contract') &&
    sourceUpdateType === 'resolved'
  ) {
    return (
      <MarketResolvedNotification
        highlighted={highlighted}
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        setHighlighted={setHighlighted}
      />
    )
  } else if (
    (sourceType === 'contract' || sourceType === 'love_contract') &&
    sourceUpdateType === 'closed'
  ) {
    return (
      <MarketClosedNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (sourceType === 'signup_bonus') {
    return (
      <SignupBonusNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (sourceType === 'answer') {
    return (
      <AnswerNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'on_new_follow') {
    return (
      <FollowNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'market_follows') {
    return (
      <FollowsOnYourMarketNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'league_changed') {
    return (
      <LeagueChangedNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'subsidized_your_market') {
    return (
      <LiquidityNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (ReactionNotificationTypes.includes(sourceType)) {
    return (
      <UserLikeNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'profit_loss_updates') {
    return (
      <WeeklyUpdateNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (sourceType === 'referral_program') {
    return (
      <ReferralProgramNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (sourceType === 'follow_suggestion') {
    return (
      <FollowSuggestionNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (reason === 'onboarding_flow' && sourceType === 'follow') {
    return (
      <FollowFromReferralNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'review_on_your_market') {
    return (
      <ReviewNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (reason === 'review_updated_on_your_market') {
    return (
      <ReviewUpdatedNotification
        notification={notification}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        isChildOfGroup={isChildOfGroup}
      />
    )
  } else if (reason === 'airdrop') {
    return (
      <AirdropNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'manifest_airdrop') {
    return (
      <ManifestAirdropNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'extra_purchased_mana') {
    return (
      <ExtraPurchasedManaNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  } else if (reason === 'market_movements') {
    return (
      <MarketMovementNotification
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />
    )
  }
  return (
    <NotificationFrame
      notification={notification}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      isChildOfGroup={isChildOfGroup}
      icon={<></>}
    >
      <div className={'ml-1 mt-1 md:text-base'}>
        <NotificationTextLabel notification={notification} />
      </div>
    </NotificationFrame>
  )
}

function LimitOrderCancelledNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceText, data, sourceContractTitle } = notification
  const {
    creatorOutcome,
    probability,
    limitAt: dataLimitAt,
    outcomeType,
    mechanism,
    betAnswer,
  } = (data as BetFillData) ?? {}

  const amountRemaining = formatMoney(parseInt(sourceText ?? '0'))
  const limitAt =
    dataLimitAt !== undefined
      ? dataLimitAt
      : Math.round(probability * 100) + '%'

  const outcome =
    outcomeType === 'PSEUDO_NUMERIC'
      ? creatorOutcome === 'YES'
        ? ' HIGHER'
        : ' LOWER'
      : creatorOutcome
  const color =
    creatorOutcome === 'YES'
      ? 'text-teal-600'
      : creatorOutcome === 'NO'
      ? 'text-scarlet-600'
      : 'text-blue-600'
  const description = (
    <span>
      Your{' '}
      {mechanism ? (
        <OutcomeLabel
          outcome={creatorOutcome}
          contract={{
            outcomeType,
            mechanism,
          }}
          answer={betAnswer ? { text: betAnswer } : undefined}
          truncate="short"
        />
      ) : (
        <span className={clsx(color)}>{outcome}</span>
      )}{' '}
      limit order for {amountRemaining} at {limitAt} was cancelled due to
      insufficient funds.
    </span>
  )
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'🚫'} />
      }
      link={getSourceUrl(notification)}
    >
      <div className="line-clamp-3">
        {description}
        {!isChildOfGroup && (
          <span>
            on <PrimaryNotificationLink text={sourceContractTitle} />
          </span>
        )}
      </div>
    </NotificationFrame>
  )
}
// Helper function to format duration into a human-readable string
function formatDuration(milliseconds: number): string {
  if (milliseconds <= 0) return 'less than a minute'

  const seconds = milliseconds / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  const months = days / 30 // Approximation using 30 days per month

  if (months >= 1) {
    const roundedMonths = Math.round(months)
    return `about ${roundedMonths} month${roundedMonths !== 1 ? 's' : ''}`
  } else if (days >= 1) {
    const roundedDays = Math.round(days)
    return `about ${roundedDays} day${roundedDays !== 1 ? 's' : ''}`
  } else if (hours >= 1) {
    const roundedHours = Math.round(hours)
    return `about ${roundedHours} hour${roundedHours !== 1 ? 's' : ''}`
  } else {
    const roundedMinutes = Math.round(minutes)
    if (roundedMinutes >= 1) {
      return `about ${roundedMinutes} minute${roundedMinutes !== 1 ? 's' : ''}`
    } else {
      return 'less than a minute'
    }
  }
}

function LimitOrderExpiredNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceText, data, sourceContractTitle, sourceContractId } =
    notification
  const {
    creatorOutcome,
    probability,
    limitAt: dataLimitAt,
    outcomeType,
    limitOrderTotal,
    betAnswerId,
    expiresAt,
    createdTime,
    mechanism,
    betAnswer,
  } = (data as BetFillData) ?? {}

  const [isLoading, setIsLoading] = useState(false)

  const amountRemaining = formatMoney(parseInt(sourceText ?? '0'))
  const limitAt =
    dataLimitAt !== undefined
      ? dataLimitAt
      : Math.round(probability * 100) + '%'

  const canShowRefreshButton =
    !!limitOrderTotal &&
    !!creatorOutcome &&
    !!probability &&
    !!sourceContractId &&
    !!expiresAt &&
    !!createdTime &&
    (outcomeType !== 'BINARY' && outcomeType !== 'PSEUDO_NUMERIC'
      ? !!betAnswerId
      : true)

  const handleRefreshOrder = async () => {
    if (!canShowRefreshButton || !expiresAt || !createdTime) {
      toast.error('Could not duplicate order: missing required data.')
      return
    }
    setIsLoading(true)
    try {
      const expiresMillisAfter = expiresAt - createdTime
      await api(
        'bet',
        removeUndefinedProps({
          contractId: sourceContractId,
          amount: limitOrderTotal,
          outcome: creatorOutcome as 'YES' | 'NO',
          limitProb: probability,
          expiresMillisAfter,
          answerId: betAnswerId,
        })
      )
      // Format the duration for the success message
      const formattedDuration = formatDuration(expiresMillisAfter)
      toast.success(`Duplicate order placed! Expires in ${formattedDuration}`)
    } catch (error) {
      console.error('Error duplicating limit order:', error)
      toast.error(
        `Error duplicating order: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    } finally {
      setIsLoading(false)
    }
  }

  const outcome =
    outcomeType === 'PSEUDO_NUMERIC'
      ? creatorOutcome === 'YES'
        ? ' HIGHER'
        : ' LOWER'
      : creatorOutcome
  const color =
    creatorOutcome === 'YES'
      ? 'text-teal-600'
      : creatorOutcome === 'NO'
      ? 'text-scarlet-600'
      : 'text-blue-600'
  const description = (
    <span>
      Your{' '}
      {mechanism ? (
        <OutcomeLabel
          outcome={creatorOutcome}
          contract={{
            outcomeType,
            mechanism,
          }}
          answer={betAnswer ? { text: betAnswer } : undefined}
          truncate="short"
        />
      ) : (
        <span className={clsx(color)}>{outcome}</span>
      )}{' '}
      limit order for {amountRemaining} at {limitAt} has expired{' '}
    </span>
  )
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon
          notification={
            {
              sourceUserName: MANIFOLD_USER_NAME,
              sourceUserUsername: MANIFOLD_USER_USERNAME,
              sourceUserAvatarUrl: MANIFOLD_AVATAR_URL,
            } as Notification
          }
          symbol={'🚫'}
        />
      }
      link={getSourceUrl(notification)}
    >
      <div className="line-clamp-3">
        {description}
        {!isChildOfGroup && (
          <span>
            on <PrimaryNotificationLink text={sourceContractTitle} />
          </span>
        )}
      </div>
      {canShowRefreshButton && (
        <Button
          size="2xs"
          color="gray-outline"
          onClick={(e) => {
            e.preventDefault()
            handleRefreshOrder()
          }}
          loading={isLoading}
          className="mt-1 self-start"
        >
          Duplicate order
        </Button>
      )}
    </NotificationFrame>
  )
}
function BetFillNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceText, data, sourceContractTitle } = notification
  const {
    creatorOutcome,
    probability,
    limitOrderRemaining,
    limitOrderTotal,
    limitAt: dataLimitAt,
    outcomeType,
    betAnswer,
  } = (data as BetFillData) ?? {}
  const amount = formatMoney(parseInt(sourceText ?? '0'))
  const limitAt =
    dataLimitAt !== undefined
      ? dataLimitAt
      : Math.round(probability * 100) + '%'

  const outcome =
    outcomeType === 'PSEUDO_NUMERIC'
      ? creatorOutcome === 'YES'
        ? ' HIGHER'
        : ' LOWER'
      : creatorOutcome
  const color =
    creatorOutcome === 'YES'
      ? 'text-teal-600'
      : creatorOutcome === 'NO'
      ? 'text-scarlet-600'
      : 'text-blue-600'
  const description =
    creatorOutcome && probability ? (
      <span>
        <span className="font-semibold">{amount}</span> of your{' '}
        <span className={clsx(color)}>{outcome}</span>{' '}
        {betAnswer && <span>{betAnswer}</span>} limit order at{' '}
        <span className="font-semibold">{limitAt}</span> was filled{' '}
      </span>
    ) : (
      <span>{amount} of your limit order was filled</span>
    )

  const subtitle = (
    <>
      {limitOrderRemaining === 0 && (
        <>
          Your limit order{' '}
          {limitOrderTotal && <>for {formatMoney(limitOrderTotal)}</>} is
          complete
        </>
      )}
      {!!limitOrderRemaining && (
        <>
          You have {formatMoney(limitOrderRemaining)}
          {limitOrderTotal && <>/{formatMoney(limitOrderTotal)}</>} remaining in
          your order
        </>
      )}
    </>
  )

  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon
          notification={notification}
          symbol={creatorOutcome === 'NO' ? '👇' : '☝️'}
        />
      }
      subtitle={subtitle}
      link={getSourceUrl(notification)}
    >
      <div className="line-clamp-3">
        {description}
        {!isChildOfGroup && (
          <span>
            on <PrimaryNotificationLink text={sourceContractTitle} />
          </span>
        )}
      </div>
    </NotificationFrame>
  )
}

function SignupBonusNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceText } = notification
  const text = (
    <span>
      Thanks for using Manifold! We sent you{' '}
      <span className={'text-teal-500'}>
        {formatMoney(parseInt(sourceText ?? ''))}
      </span>{' '}
      for being a valuable new predictor.
    </span>
  )

  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <NotificationIcon
          symbol={'✨'}
          symbolBackgroundClass={
            'bg-gradient-to-br from-primary-600 to-primary-300'
          }
        />
      }
      link={getSourceUrl(notification)}
    >
      <Row>{text}</Row>
    </NotificationFrame>
  )
}

export function MarketResolvedNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const {
    sourceText,
    data,
    sourceId,
    sourceUserName,
    sourceUserUsername,
    sourceContractTitle,
    sourceContractCreatorUsername,
  } = notification
  const { userInvestment, userPayout, profitRank, totalShareholders, token } =
    (data as ContractResolutionData) ?? {}
  const profit = userPayout - userInvestment
  const profitable = profit > 0 && !floatingEqual(userInvestment, 0)
  const betterThan = (totalShareholders ?? 0) - (profitRank ?? 0)
  const comparison =
    profitRank && totalShareholders && betterThan > 0
      ? `you outperformed ${betterThan} other${betterThan > 1 ? 's' : ''}!`
      : ''
  const secondaryTitle =
    sourceText === 'CANCEL' && userInvestment > 0 ? (
      <>
        Your {formatMoney(userInvestment, token)} invested has been returned to
        you
      </>
    ) : sourceText === 'CANCEL' && Math.abs(userPayout) > 0 ? (
      <>Your {formatMoney(-userPayout, token)} in profit has been removed</>
    ) : profitable ? (
      <>
        Your {formatMoney(userInvestment, token)} won{' '}
        <span className="text-teal-600">+{formatMoney(profit, token)}</span> in
        profit
        {comparison ? `, and ${comparison}` : ``} 🎉🎉🎉
      </>
    ) : userInvestment > 0 ? (
      <>
        You lost {formatMoney(Math.abs(profit), token)}
        {comparison ? `, but ${comparison}` : ``}
      </>
    ) : null

  const [openRateModal, setOpenRateModal] = useState(false)

  const resolutionDescription = () => {
    if (!sourceText) return <div />

    if (sourceText === 'YES' || sourceText == 'NO') {
      return <BinaryOutcomeLabel outcome={sourceText as any} />
    }

    const isNumberWithPercent = /^[0-9]+%$/.test(sourceText)
    if (isNumberWithPercent) {
      return (
        <ProbPercentLabel
          prob={parseFloat(sourceText.replace('%', '')) / 100}
        />
      )
    }
    if (sourceText === 'MKT' || sourceText === 'PROB') return <MultiLabel />

    // Numeric markets
    const isNumberWithCommaOrPeriod = /^[0-9,.]*$/.test(sourceText)
    if (isNumberWithCommaOrPeriod)
      return <NumericValueLabel value={parseFloat(sourceText)} />

    // Free response market
    return (
      <span
        className={
          'inline-block max-w-[200px] truncate align-bottom text-blue-600'
        }
      >
        {sourceText}
      </span>
    )
  }

  const resolvedByAdmin = sourceUserUsername != sourceContractCreatorUsername

  const showManifoldAsResolver = token === 'CASH'

  const resolverName = showManifoldAsResolver
    ? MANIFOLD_USER_NAME
    : resolvedByAdmin
    ? 'A mod'
    : sourceUserName
  const resolverUsername = showManifoldAsResolver
    ? MANIFOLD_USER_USERNAME
    : sourceUserUsername
  const resolverAvatarUrl = showManifoldAsResolver
    ? MANIFOLD_AVATAR_URL
    : notification.sourceUserAvatarUrl

  const content =
    sourceText === 'CANCEL' ? (
      <>
        <NotificationUserLink
          userId={sourceId}
          name={resolverName}
          username={resolverUsername}
        />{' '}
        cancelled {isChildOfGroup && <span>the question</span>}
        {!isChildOfGroup && (
          <span>
            {' '}
            <PrimaryNotificationLink
              text={sourceContractTitle}
              truncatedLength={'xl'}
            />
          </span>
        )}
      </>
    ) : (
      <>
        <NotificationUserLink
          userId={sourceId}
          name={resolverName}
          username={resolverUsername}
        />{' '}
        resolved {isChildOfGroup && <span>the question</span>}
        {!isChildOfGroup && (
          <span>
            <PrimaryNotificationLink
              text={sourceContractTitle}
              truncatedLength={'xl'}
            />
          </span>
        )}{' '}
        to {resolutionDescription()}
      </>
    )

  const [justNowReview, setJustNowReview] = useState<null | Rating>(null)
  const userReview = useReview(notification.sourceId, notification.userId)
  const showReviewButton = !userReview && !justNowReview

  return (
    <>
      <NotificationFrame
        notification={notification}
        isChildOfGroup={isChildOfGroup}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        subtitle={
          <>
            {!resolvedByAdmin &&
              (showReviewButton ? (
                <Button
                  size={'2xs'}
                  color={'gray'}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setOpenRateModal(true)
                  }}
                >
                  <Row className="gap-1">
                    <StarIcon className="h-4 w-4" />
                    Rate {notification.sourceUserName}'s resolution
                  </Row>
                </Button>
              ) : (
                <Row className="text-ink-500 items-center gap-0.5 text-sm italic">
                  You rated this resolution{' '}
                  {justNowReview ?? userReview?.rating}{' '}
                  <StarIcon className="h-4 w-4" />
                </Row>
              ))}
          </>
        }
        icon={
          <>
            <AvatarNotificationIcon
              notification={{
                ...notification,
                sourceUserAvatarUrl: resolverAvatarUrl,
              }}
              symbol={sourceText === 'CANCEL' ? '🚫' : profitable ? '💰' : '☑️'}
            />
            {!!secondaryTitle && (
              <div
                className={clsx(
                  ' h-full w-[1.5px] grow ',
                  profit < 0 ? 'bg-ink-300' : 'bg-teal-400'
                )}
              />
            )}
          </>
        }
        link={getSourceUrl(notification)}
      >
        {content}
        <Modal open={openRateModal} setOpen={setOpenRateModal}>
          <ReviewPanel
            title={notification.sourceContractTitle ?? ''}
            resolverUser={undefined}
            currentUser={undefined}
            marketId={notification.sourceId}
            author={notification.sourceUserName}
            className="my-2"
            onSubmit={(rating: Rating) => {
              setJustNowReview(rating)
              setOpenRateModal(false)
            }}
          />
        </Modal>
      </NotificationFrame>
      {!!secondaryTitle && (
        <NotificationFrame
          notification={notification}
          isChildOfGroup={isChildOfGroup}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          icon={
            <>
              <div
                className={clsx(
                  'absolute -top-4 h-4 w-[1.5px]',
                  profit < 0 ? 'bg-ink-300' : 'bg-teal-400'
                )}
              />

              <NotificationIcon
                symbol={<TokenNumber hideAmount={true} coinType={token} />}
                symbolBackgroundClass={
                  profit < 0
                    ? 'border-ink-300  border-2 ring-4 ring-ink-200'
                    : 'border-teal-400 border-2 ring-4 ring-teal-200'
                }
              />
            </>
          }
          link={getSourceUrl(notification)}
        >
          {secondaryTitle}
        </NotificationFrame>
      )}
    </>
  )
}

function MarketClosedNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceContractTitle } = notification
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <NotificationIcon
          symbol={'❗'}
          symbolBackgroundClass={
            'bg-gradient-to-br from-amber-400 to-amber-200'
          }
        />
      }
      subtitle={
        <span>
          Or, if this market closed too early, please extend the close time to
          reopen trading. If you're not sure what to do, ask for help from
          traders on the question page or in our{' '}
          <Link
            onClick={(e) => {
              e.stopPropagation()
            }}
            href="https://discord.gg/eHQBNBqXuh"
            className={clsx(linkClass)}
          >
            Discord
          </Link>
          .
        </span>
      }
      link={getSourceUrl(notification)}
    >
      <span className="line-clamp-3">
        If you can, please resolve
        {!isChildOfGroup && (
          <>
            {' '}
            <PrimaryNotificationLink text={sourceContractTitle} />
          </>
        )}
      </span>
    </NotificationFrame>
  )
}

function NewMarketNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceContractTitle, sourceId, sourceUserName, sourceUserUsername } =
    notification
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'🌟'} />
      }
      link={getSourceUrl(notification)}
    >
      <div className="line-clamp-3">
        <NotificationUserLink
          userId={sourceId}
          name={sourceUserName}
          username={sourceUserUsername}
        />{' '}
        <span>
          asked <PrimaryNotificationLink text={sourceContractTitle} />
        </span>
      </div>
    </NotificationFrame>
  )
}

function CommentNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const {
    sourceId,
    sourceUserName,
    sourceUserUsername,
    reason,
    sourceText,
    sourceTitle,
    markedAsRead,
  } = notification

  const reasonText =
    reason === 'reply_to_users_answer' || reason === 'reply_to_users_comment'
      ? 'replied to you '
      : `commented `

  const comment = sourceText

  const handleDismiss = async () => {
    await api('mark-notification-read', {
      notificationId: notification.id,
    })
  }

  const isPinned = markedAsRead === false

  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'💬'} />
      }
      subtitle={
        <div>
          {comment && (
            <div className="line-clamp-2">
              <Linkify text={comment} />
            </div>
          )}
        </div>
      }
      link={getSourceUrl(notification)}
      isPinned={isPinned}
      onDismiss={isPinned ? handleDismiss : undefined}
    >
      <div className="line-clamp-3">
        <NotificationUserLink
          userId={sourceId}
          name={sourceUserName}
          username={sourceUserUsername}
        />{' '}
        {reasonText}
        {!isChildOfGroup && (
          <span>
            on <PrimaryNotificationLink text={sourceTitle} />
          </span>
        )}
      </div>
    </NotificationFrame>
  )
}

function BetReplyNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceId, sourceUserName, sourceUserUsername, sourceContractTitle } =
    notification
  const { betOutcome, betAmount, commentText } =
    notification.data as BetReplyNotificationData

  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'💬'} />
      }
      subtitle={commentText}
      link={getSourceUrl(notification)}
    >
      <div className="line-clamp-3">
        <NotificationUserLink
          userId={sourceId}
          name={sourceUserName}
          username={sourceUserUsername}
        />{' '}
        {TRADED_TERM}{' '}
        <span
          className={
            betOutcome === 'YES' ? 'text-teal-600' : 'text-scarlet-600'
          }
        >
          {formatMoney(betAmount)} {betOutcome}
        </span>{' '}
        in reply to your comment{' '}
        {!isChildOfGroup && (
          <span>
            on <PrimaryNotificationLink text={sourceContractTitle} />
          </span>
        )}
      </div>
    </NotificationFrame>
  )
}

function AnswerNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const {
    sourceId,
    sourceUserName,
    sourceUserUsername,
    sourceText,
    sourceContractTitle,
  } = notification
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'🙋'} />
      }
      subtitle={<div className="line-clamp-2">{sourceText}</div>}
      link={getSourceUrl(notification)}
    >
      <div className="line-clamp-3">
        <NotificationUserLink
          userId={sourceId}
          name={sourceUserName}
          username={sourceUserUsername}
        />{' '}
        answered{' '}
        {!isChildOfGroup && (
          <span>
            <PrimaryNotificationLink text={sourceContractTitle} />
          </span>
        )}
      </div>
    </NotificationFrame>
  )
}

function TaggedUserNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceId, sourceUserName, sourceUserUsername, sourceTitle } =
    notification

  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'🏷️'} />
      }
      link={getSourceUrl(notification)}
    >
      <div className="line-clamp-3">
        <NotificationUserLink
          userId={sourceId}
          name={sourceUserName}
          username={sourceUserUsername}
        />{' '}
        tagged you{' '}
        {!isChildOfGroup && (
          <span>
            on <PrimaryNotificationLink text={sourceTitle} />
          </span>
        )}
      </div>
    </NotificationFrame>
  )
}

export function MultipleAvatarIcons(props: {
  notification: Notification
  symbol: string
  setOpen: (open: boolean) => void
}) {
  const { notification, symbol, setOpen } = props
  const relatedNotifications: Notification[] = sortBy(
    notification.data?.relatedNotifications ?? [notification],
    (n) => n.createdTime
  )

  const combineAvatars = (notifications: Notification[]) => {
    const totalAvatars = notifications.length
    const maxToShow = Math.min(totalAvatars, 3)
    const avatarsToCombine = notifications.slice(
      totalAvatars - maxToShow,
      totalAvatars
    )
    const max = avatarsToCombine.length
    const startLeft = -0.35 * (max - 1)
    return avatarsToCombine.map((n, index) => (
      <div
        key={index}
        className={'absolute'}
        style={
          index === 0
            ? {
                left: `${startLeft}rem`,
              }
            : {
                left: `${startLeft + index * 0.5}rem`,
              }
        }
      >
        <AvatarNotificationIcon
          notification={n}
          symbol={index === max - 1 ? symbol : ''}
        />
      </div>
    ))
  }

  return (
    <div
      onClick={(event) => {
        if (relatedNotifications.length === 1) return
        event.preventDefault()
        setOpen(true)
      }}
    >
      {relatedNotifications.length > 1 ? (
        <Col
          className={`pointer-events-none relative items-center justify-center`}
        >
          {/* placeholder avatar to set the proper size*/}
          <Avatar size={NOTIFICATION_ICON_SIZE} />
          {combineAvatars(relatedNotifications)}
        </Col>
      ) : (
        <AvatarNotificationIcon notification={notification} symbol={symbol} />
      )}
    </div>
  )
}

function UserLikeNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  const [open, setOpen] = useState(false)
  const { sourceUserName, sourceType, sourceText } = notification
  const relatedNotifications: Notification[] = notification.data
    ?.relatedNotifications ?? [notification]
  const reactorsText =
    relatedNotifications.length > 1
      ? `${sourceUserName} & ${relatedNotifications.length - 1} other${
          relatedNotifications.length > 2 ? 's' : ''
        }`
      : sourceUserName
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <MultipleAvatarIcons
          notification={notification}
          symbol={'💖'}
          setOpen={setOpen}
        />
      }
      link={getSourceUrl(notification)}
      subtitle={
        sourceType === 'comment_like' || sourceType === 'post_comment_like' ? (
          <Linkify text={sourceText} />
        ) : (
          <></>
        )
      }
    >
      {reactorsText && <PrimaryNotificationLink text={reactorsText} />} liked
      your
      {sourceType === 'comment_like' || sourceType === 'post_comment_like'
        ? ' comment ' + (isChildOfGroup ? '' : 'on ')
        : sourceType === 'post_like'
        ? ' post '
        : ' question '}
      {!isChildOfGroup && <QuestionOrGroupLink notification={notification} />}
      <MultiUserReactionModal
        similarNotifications={relatedNotifications}
        modalLabel={'Who liked it?'}
        open={open}
        setOpen={setOpen}
      />
    </NotificationFrame>
  )
}

function FollowNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceId, sourceUserName, sourceUserUsername } = notification
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon
          notification={notification}
          symbol={
            <Col className="from-ink-400 to-ink-200 h-5 w-5 items-center rounded-lg bg-gradient-to-br text-sm">
              ➕
            </Col>
          }
        />
      }
      link={getSourceUrl(notification)}
    >
      <>
        <NotificationUserLink
          userId={sourceId}
          name={sourceUserName}
          username={sourceUserUsername}
        />{' '}
        followed you
      </>
    </NotificationFrame>
  )
}

function FollowsOnYourMarketNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceId, sourceUserName, sourceUserUsername } = notification

  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon
          notification={notification}
          symbol={
            <Col className="from-ink-400 to-ink-200 h-5 w-5 items-center rounded-lg bg-gradient-to-br text-sm">
              👀
            </Col>
          }
        />
      }
      link={`/${sourceUserUsername}`}
    >
      <>
        <NotificationUserLink
          userId={sourceId}
          name={sourceUserName}
          username={sourceUserUsername}
        />{' '}
        followed your market <QuestionOrGroupLink notification={notification} />
      </>
    </NotificationFrame>
  )
}

function LiquidityNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const {
    sourceId,
    sourceUserName,
    sourceUserUsername,
    sourceText,
    sourceContractTitle,
    data,
  } = notification
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'💧'} />
      }
      link={getSourceUrl(notification)}
    >
      <div className="line-clamp-3">
        <NotificationUserLink
          userId={sourceId}
          name={sourceUserName}
          username={sourceUserUsername}
        />{' '}
        added{' '}
        {sourceText && (
          <span>{formatMoney(parseInt(sourceText), data?.token)} of</span>
        )}{' '}
        liquidity{' '}
        {!isChildOfGroup && (
          <span>
            to <PrimaryNotificationLink text={sourceContractTitle} />
          </span>
        )}
      </div>
    </NotificationFrame>
  )
}

function ReferralProgramNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  // const { notification, highlighted, setHighlighted } = props
  // const [showModal, setShowModal] = useState(false)
  // const user = useUser()
  return null
  // return (
  //   <NotificationFrame
  //     notification={notification}
  //     isChildOfGroup={false}
  //     highlighted={highlighted}
  //     setHighlighted={setHighlighted}
  //     onClick={() => setShowModal(true)}
  //     icon={
  //       <AvatarNotificationIcon
  //         notification={
  //           {
  //             sourceUserName: MANIFOLD_USER_NAME,
  //             sourceUserUsername: MANIFOLD_USER_USERNAME,
  //             sourceUserAvatarUrl: MANIFOLD_AVATAR_URL,
  //           } as Notification
  //         }
  //         symbol={'💸'}
  //       />
  //     }
  //     subtitle={<span>Tap here to see your referral code.</span>}
  //   >
  //     <span>
  //       Refer friends and get{' '}
  //       <TokenNumber
  //         coinType={'MANA'}
  //         amount={REFERRAL_AMOUNT}
  //         className={clsx('mr-1 font-bold')}
  //         isInline
  //       />
  //       on every sign up!
  //     </span>
  //     {user && showModal && (
  //       <Modal open={showModal} setOpen={setShowModal}>
  //         <Referrals user={user} />
  //       </Modal>
  //     )}
  //   </NotificationFrame>
  // )
}

function FollowFromReferralNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceId, sourceUserName, sourceUserUsername } = notification
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon
          notification={notification}
          symbol={
            <Col className="from-ink-400 to-ink-200 h-5 w-5 items-center rounded-lg bg-gradient-to-br text-sm">
              ➕
            </Col>
          }
        />
      }
      link={`/home`}
      subtitle={`Tap here to find more people to follow, or to unfollow them.`}
    >
      <>
        <span>
          You're now following{' '}
          <NotificationUserLink
            userId={sourceId}
            name={sourceUserName}
            username={sourceUserUsername}
          />{' '}
          (you just {TRADED_TERM} on their question!)
        </span>
      </>
    </NotificationFrame>
  )
}
function FollowSuggestionNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceId, sourceUserName, sourceUserUsername } = notification
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <AvatarNotificationIcon
          notification={notification}
          symbol={
            <Col className="from-ink-400 to-ink-200 h-5 w-5 items-center rounded-lg bg-gradient-to-br text-sm">
              ➕
            </Col>
          }
        />
      }
      link={`/home`}
      subtitle={`Or, tap here to find other people to follow!`}
    >
      <>
        <span>
          Follow{' '}
          <NotificationUserLink
            userId={sourceId}
            name={sourceUserName}
            username={sourceUserUsername}
          />{' '}
          to get notified when they make new questions.
        </span>
      </>
    </NotificationFrame>
  )
}
function WeeklyUpdateNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { data } = notification
  const { weeklyProfit } = data as WeeklyPortfolioUpdate
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      link={getSourceUrl(notification)}
      icon={
        <NotificationIcon
          symbol={'✨'}
          symbolBackgroundClass={
            'bg-gradient-to-br from-primary-600 to-primary-300'
          }
        />
      }
    >
      <>
        <span>
          Your portfolio changed by{' '}
          <span className={clsx(weeklyProfit > 0 ? 'text-teal-600' : '')}>
            {formatMoney(Math.abs(weeklyProfit))}
          </span>{' '}
          this week. Tap here to see your summary!
        </span>
      </>
    </NotificationFrame>
  )
}

function BountyAwardedNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      link={getSourceUrl(notification)}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'💰'} />
      }
    >
      <>
        <span>
          <NotificationUserLink
            userId={notification.sourceId}
            name={notification.sourceUserName}
            username={notification.sourceUserUsername}
            className="mr-1"
          />
          awarded you a{' '}
          <span className="font-semibold text-teal-600">
            {formatMoney(+notification?.sourceText)}
          </span>{' '}
          bounty
          {!isChildOfGroup && (
            <span>
              {' '}
              for your answer on{' '}
              <PrimaryNotificationLink
                text={notification.sourceContractTitle}
              />
            </span>
          )}
        </span>
      </>
    </NotificationFrame>
  )
}

function BountyAddedNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      link={getSourceUrl(notification)}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'💰'} />
      }
    >
      <>
        <span>
          <NotificationUserLink
            userId={notification.sourceId}
            name={notification.sourceUserName}
            username={notification.sourceUserUsername}
            className=""
          />{' '}
          added{' '}
          <span className="font-semibold text-teal-600">
            {formatMoney(+notification?.sourceText)}
          </span>{' '}
          to your bountied question{' '}
          {!isChildOfGroup && (
            <span>
              <PrimaryNotificationLink
                text={notification.sourceContractTitle}
              />
            </span>
          )}
        </span>
      </>
    </NotificationFrame>
  )
}

function BountyCanceledNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      link={getSourceUrl(notification)}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'❌'} />
      }
      subtitle={`with ${notification.sourceText} bounty left unpaid`}
    >
      <span>
        <NotificationUserLink
          userId={notification.sourceId}
          name={notification.sourceUserName}
          username={notification.sourceUserUsername}
          className=""
        />{' '}
        canceled bounty{' '}
        {!isChildOfGroup && (
          <span>
            <PrimaryNotificationLink text={notification.sourceContractTitle} />
          </span>
        )}
      </span>
    </NotificationFrame>
  )
}

function VotedNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      link={getSourceUrl(notification)}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'🗳️'} />
      }
    >
      <span>
        <NotificationUserLink
          userId={notification.sourceId}
          name={notification.sourceUserName}
          username={notification.sourceUserUsername}
          className=""
        />{' '}
        voted on <b>{notification.sourceText}</b>
        {!isChildOfGroup && (
          <span>
            {' '}
            on{' '}
            <PrimaryNotificationLink text={notification.sourceContractTitle} />
          </span>
        )}
      </span>
    </NotificationFrame>
  )
}
function ReviewNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  const { rating, review } = notification.data as ReviewNotificationData
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      link={getSourceUrl(notification)}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'⭐️'} />
      }
      subtitle={review}
    >
      <span>
        <NotificationUserLink
          userId={notification.sourceId}
          name={notification.sourceUserName}
          username={notification.sourceUserUsername}
          className=""
        />{' '}
        gave you{' '}
        <span
          className={clsx(
            rating > 3
              ? 'rounded-md bg-gradient-to-br from-amber-100 to-amber-400 px-2 dark:text-gray-500'
              : ''
          )}
        >
          {rating} star{rating > 1 ? 's' : ''}
        </span>
        {!isChildOfGroup && (
          <span>
            {' '}
            on{' '}
            <PrimaryNotificationLink text={notification.sourceContractTitle} />
          </span>
        )}
      </span>
    </NotificationFrame>
  )
}

function PollClosedNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      link={getSourceUrl(notification)}
      icon={
        <NotificationIcon
          symbol={'🗳️'}
          symbolBackgroundClass="bg-gradient-to-br from-fuchsia-500 to-fuchsia-200"
        />
      }
      subtitle={notification.sourceText}
    >
      <>
        <span>
          {notification.reason == 'your_poll_closed' ? (
            <span>Your poll</span>
          ) : (
            <span>
              <NotificationUserLink
                userId={notification.sourceId}
                name={notification.sourceUserName}
                username={notification.sourceUserUsername}
                className=""
              />
              {`'s poll`}
            </span>
          )}
          {!isChildOfGroup && (
            <span>
              {' '}
              <PrimaryNotificationLink
                text={notification.sourceContractTitle}
              />
            </span>
          )}{' '}
          has autoclosed!
        </span>
      </>
    </NotificationFrame>
  )
}

function AirdropNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  const { amount } = notification.data as AirdropData

  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={<GiftIcon className="text-primary-500 h-8 w-8" />}
      subtitle={<></>}
    >
      Congratulations! You just received{' '}
      <span className="font-semibold">{formatMoney(amount)}</span>as a gift from
      Manifold for being active for 30 days this year!
    </NotificationFrame>
  )
}

function ManifestAirdropNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  const { amount } = notification.data as AirdropData

  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={<GiftIcon className="text-primary-500 h-8 w-8" />}
      subtitle={<></>}
    >
      Congratulations! As a gift for attending Manifest, you just received{' '}
      <span className="font-semibold">{formatMoney(amount)}</span> and{' '}
      <SpiceCoin /> 5,000!
    </NotificationFrame>
  )
}

function ExtraPurchasedManaNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  const { amount } = notification.data as ExtraPurchasedManaData

  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={<GiftIcon className="text-primary-500 h-8 w-8" />}
      subtitle={<></>}
    >
      Thank you for buying mana in 2024! You just received{' '}
      <span className="font-semibold">{formatMoney(amount)}</span>, which is 9
      times what you purchased, as a gift from Manifold!
    </NotificationFrame>
  )
}

export function PaymentSuccessNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { amount, currency, paymentMethodType } =
    notification.data as PaymentCompletedData
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={<BsBank className="text-primary-500 h-8 w-8" />}
      subtitle={
        <span className="text-ink-600">
          You should receive your funds within the next couple days.
        </span>
      }
    >
      <span>
        Your {paymentMethodType} payment for {formatMoneyUSD(amount)} {currency}{' '}
        was approved!
      </span>
    </NotificationFrame>
  )
}

function MarketMovementNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceContractTitle, data } = notification

  const startProb = data?.val_start ?? 0
  const endProb = data?.val_end ?? 0
  const answerText = data?.answerText

  // Calculate the difference and determine if it's an increase or decrease
  const probDiff = endProb - startProb
  const isIncrease = probDiff > 0

  // Format the probabilities as percentages
  const startProbText = `${Math.round(startProb * 100)}%`
  const endProbText = `${Math.round(endProb * 100)}%`

  // Colors and direction text based on movement
  // const changeColor = isIncrease ? 'text-teal-600' : 'text-scarlet-600'
  const newProbClass = 'text-ink-900 font-semibold'

  // Font Awesome trend icons based on direction
  const TrendIcon = isIncrease ? FaArrowTrendUp : FaArrowTrendDown
  const iconColor = isIncrease ? 'text-teal-500' : 'text-scarlet-500'

  // Content to display for different market types
  const content = (
    <div className="flex items-center gap-2">
      <div className="flex-grow">
        {answerText ? (
          <>
            <PrimaryNotificationLink
              truncatedLength="xl"
              text={sourceContractTitle}
            />
            <br />
            <span className="font-semibold">{answerText}</span> moved{' '}
            <span className={newProbClass}>
              {startProbText} → <span>{endProbText}</span>
            </span>{' '}
          </>
        ) : (
          <>
            <PrimaryNotificationLink
              text={sourceContractTitle}
              truncatedLength="xl"
            />
            <br />
            Probability moved{' '}
            <span className={newProbClass}>
              {startProbText} →<span>{endProbText}</span>
            </span>
          </>
        )}
      </div>
    </div>
  )

  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <TrendIcon className={`${iconColor} h-6 w-6`} />
        </div>
      }
      link={getSourceUrl(notification)}
    >
      {content}
    </NotificationFrame>
  )
}

function AIDescriptionUpdateNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, isChildOfGroup, highlighted, setHighlighted } = props
  const { sourceContractTitle } = notification
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      icon={
        <NotificationIcon
          symbol={'🤖'}
          symbolBackgroundClass="bg-gradient-to-br from-blue-500 to-blue-200"
        />
      }
      link={getSourceUrl(notification)}
    >
      <div className="line-clamp-3">
        <span>
          Our AI added a clarification to the description of{' '}
          <PrimaryNotificationLink text={sourceContractTitle} />
        </span>
      </div>
    </NotificationFrame>
  )
}

function ReviewUpdatedNotification(props: {
  notification: Notification
  highlighted: boolean
  setHighlighted: (highlighted: boolean) => void
  isChildOfGroup?: boolean
}) {
  const { notification, highlighted, setHighlighted, isChildOfGroup } = props
  const { rating, review } = notification.data as ReviewNotificationData
  return (
    <NotificationFrame
      notification={notification}
      isChildOfGroup={isChildOfGroup}
      highlighted={highlighted}
      setHighlighted={setHighlighted}
      link={getSourceUrl(notification)}
      icon={
        <AvatarNotificationIcon notification={notification} symbol={'✏️'} />
      }
      subtitle={review}
    >
      <span>
        <NotificationUserLink
          userId={notification.sourceId}
          name={notification.sourceUserName}
          username={notification.sourceUserUsername}
          className=""
        />{' '}
        updated their review to{' '}
        <span
          className={clsx(
            rating > 3
              ? 'rounded-md bg-gradient-to-br from-amber-100 to-amber-400 px-2 dark:text-gray-500'
              : ''
          )}
        >
          {rating} star{rating > 1 ? 's' : ''}
        </span>
        {!isChildOfGroup && (
          <span>
            {' '}
            on{' '}
            <PrimaryNotificationLink text={notification.sourceContractTitle} />
          </span>
        )}
      </span>
    </NotificationFrame>
  )
}
