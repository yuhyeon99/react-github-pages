import React, { useState, useEffect } from 'react';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function Home(){

    const pUrl = process.env.PUBLIC_URL;

    useEffect(()=>{        
        const slide = document.querySelector(".slide");
        const slideChildren = document.querySelectorAll('.slide > li');
        const slideLen = slideChildren.length;
        
        let firstSlide = document.querySelector('.slide > li:first-child').cloneNode(true);
        let lastSlide = document.querySelector('.slide > li:last-child').cloneNode(true);
        
        slideChildren[slideLen-1].after(firstSlide);
        slideChildren[0].before(lastSlide);
        
        let slidePos = 0;

        let status = true;

        
        const nextButton = () =>{
            if(status == false){
                return false;
            }
            status = false;

            if(slidePos <= slideLen-1){
                slide.style.cssText = `
                    transition:all .5s ease-in-out;
                    margin-left:-${(slidePos+2)*100}%;
                `;
            };
            if(slidePos == slideLen-1){   
                setTimeout(()=>{
                    slide.style.cssText = `
                        transition:all 0s;
                        margin-left:-100%;
                    `;
                },500);
                slidePos = -1;
            };
            slidePos ++;

            setTimeout(()=>{
                status=true;
            },500);
        };

        const prevButton = () =>{
            if(status == false){
                return false;
            }
            status = false;

            if(slidePos >= 0){
                slide.style.cssText = `
                    transition:all .5s ease-in-out;
                    margin-left:-${slidePos*100}%;
                `;
            };
            if(slidePos == 0){
                setTimeout(()=>{
                    slide.style.cssText = `
                        transition:all 0s;
                        margin-left:-${slideLen*100}%;
                    `;
                }, 500);

                slidePos = slideLen;
            }
            slidePos --;

            setTimeout(()=>{
                status=true;
            },500);
        };

        let slideInterval;

        function startSlide(){
            slideInterval = setInterval(nextButton, 4000);
        }
        function stopSlide(){
            clearInterval(slideInterval);
        }

        startSlide();

        let leftBtn = document.getElementById('leftBtn');
        let rightBtn = document.getElementById('rightBtn');
        
        leftBtn.addEventListener('click', (e)=>{
            stopSlide();startSlide();
            prevButton();
        });

        rightBtn.addEventListener('click', (e)=>{
            stopSlide();startSlide();
            nextButton();
        });

    }, []);
    return (
        <li className="gaming">
            <div className="ele1">
                <ul className="posBtn">
                    <li id="leftBtn"><FontAwesomeIcon icon={faChevronLeft} /></li>
                    <li id="rightBtn"><FontAwesomeIcon icon={faChevronRight} /></li>
                </ul>
                <ul className="slide">
                    <li></li>
                    <li><img src={pUrl + '/images/img_1_layout_1.jpg'} /></li>
                    <li><img src={pUrl + '/images/img_2_layout_1.jpg'} /></li>
                    <li><img src={pUrl + '/images/img_3_layout_1.jpg'} /></li>
                </ul>
            </div>
            <div className="ele2">
                <ul>                 
                <li>
                    <div>
                    <p>1절 : 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</p>
                    <p>2절 : 남산 위에 저 소나무 철갑을 두른 듯 바람서리 불변함은 우리 기상일세</p>
                    <p>3절 : 가을 하늘 공활한데
                    높고 구름 없이
                    밝은 달은 우리 가슴
                    일편단심일세</p>
                    <p>4절 : 이 기상과 이 맘으로
                    충성을 다하여
                    괴로우나 즐거우나
                    나라 사랑하세</p>
                    <p><b>후렴 : 무궁화 삼천리
                    화려 강산
                    대한 사람 대한으로
                    길이 보전하세</b></p>
                    </div>
                </li>
                </ul>
            </div>
            <div className="ele2">
                <ul>                 
                <li>
                    <div>
                    <p>1절 : 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</p>
                    <p>2절 : 남산 위에 저 소나무 철갑을 두른 듯 바람서리 불변함은 우리 기상일세</p>
                    <p>3절 : 가을 하늘 공활한데
                    높고 구름 없이
                    밝은 달은 우리 가슴
                    일편단심일세</p>
                    <p>4절 : 이 기상과 이 맘으로
                    충성을 다하여
                    괴로우나 즐거우나
                    나라 사랑하세</p>
                    <p><b>후렴 : 무궁화 삼천리
                    화려 강산
                    대한 사람 대한으로
                    길이 보전하세</b></p>
                    </div>
                </li>
                </ul>
            </div>
            <div className="ele2">
                <ul>                 
                <li>
                    <div>
                    <p>1절 : 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</p>
                    <p>2절 : 남산 위에 저 소나무 철갑을 두른 듯 바람서리 불변함은 우리 기상일세</p>
                    <p>3절 : 가을 하늘 공활한데
                    높고 구름 없이
                    밝은 달은 우리 가슴
                    일편단심일세</p>
                    <p>4절 : 이 기상과 이 맘으로
                    충성을 다하여
                    괴로우나 즐거우나
                    나라 사랑하세</p>
                    <p><b>후렴 : 무궁화 삼천리
                    화려 강산
                    대한 사람 대한으로
                    길이 보전하세</b></p>
                    </div>
                </li>
                </ul>
            </div>
            <div className="ele2">
                <ul>                 
                <li>
                    <div>
                    <p>1절 : 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</p>
                    <p>2절 : 남산 위에 저 소나무 철갑을 두른 듯 바람서리 불변함은 우리 기상일세</p>
                    <p>3절 : 가을 하늘 공활한데
                    높고 구름 없이
                    밝은 달은 우리 가슴
                    일편단심일세</p>
                    <p>4절 : 이 기상과 이 맘으로
                    충성을 다하여
                    괴로우나 즐거우나
                    나라 사랑하세</p>
                    <p><b>후렴 : 무궁화 삼천리
                    화려 강산
                    대한 사람 대한으로
                    길이 보전하세</b></p>
                    </div>
                </li>
                </ul>
            </div>
        </li>
    )
};

export default Home;
