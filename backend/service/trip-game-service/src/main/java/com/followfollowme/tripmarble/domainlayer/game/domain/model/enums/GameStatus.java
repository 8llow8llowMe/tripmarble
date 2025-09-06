package com.followfollowme.tripmarble.domainlayer.game.domain.model.enums;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GameStatus {
    WAITING("게임 시작 전") {
        @Override
        public void validatePlayable() {
            throw new TripGameException(TripGameErrorCode.GAME_NOT_ONGOING);
        }

        @Override
        public void validateStartable() {

        }

        @Override
        public void validateResumable() {

        }

        @Override
        public void validateEndable() {
            throw new TripGameException(TripGameErrorCode.GAME_NOT_ONGOING);
        }
    },
    ONGOING("게임 진행 중") {
        @Override
        public void validatePlayable() {

        }

        @Override
        public void validateStartable() {
            throw new TripGameException(TripGameErrorCode.GAME_NOT_WAITING);
        }

        @Override
        public void validateResumable() {

        }

        @Override
        public void validateEndable() {

        }
    },
    ENDED("게임 종료됨") {
        @Override
        public void validatePlayable() {
            throw new TripGameException(TripGameErrorCode.GAME_ALREADY_ENDED);
        }

        @Override
        public void validateStartable() {
            throw new TripGameException(TripGameErrorCode.GAME_ALREADY_ENDED);
        }

        @Override
        public void validateResumable() {
            throw new TripGameException(TripGameErrorCode.GAME_ALREADY_ENDED);
        }

        @Override
        public void validateEndable() {
            throw new TripGameException(TripGameErrorCode.GAME_ALREADY_ENDED);
        }
    };

    private final String description;

    public abstract void validatePlayable();

    public abstract void validateStartable();

    public abstract void validateResumable();

    public abstract void validateEndable();
}
