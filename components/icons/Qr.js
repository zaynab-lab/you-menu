export default function Home({ color }) {
  return (
    <>
      <svg
        width="39"
        height="39"
        viewBox="0 0 39 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.58068 0.14474C1.9532 0.582345 0.566508 1.98305 0.140162 3.62004C0.0308526 4.0398 0 4.7092 0 6.6636V9.16903L0.267599 9.43663C0.556803 9.72583 0.99102 9.79101 1.39677 9.60618C1.85296 9.39836 1.87356 9.28044 1.92418 6.59155C1.97014 4.15057 1.97838 4.06003 2.19663 3.6162C2.48355 3.03257 3.03257 2.48355 3.6162 2.19663C4.06003 1.97838 4.15057 1.97014 6.59155 1.92418C9.28044 1.87356 9.39836 1.85296 9.60617 1.39677C9.79101 0.991021 9.72583 0.556803 9.43663 0.267599L9.16903 0L6.62149 0.00604243C4.7006 0.0105283 3.95264 0.0446762 3.58068 0.14474ZM29.5634 0.267599C29.2742 0.556803 29.209 0.991021 29.3938 1.39677C29.6016 1.85296 29.7196 1.87356 32.4085 1.92418C34.7796 1.96877 34.9502 1.98351 35.3409 2.17658C35.9912 2.49801 36.378 2.86833 36.7178 3.49489L37.0317 4.07394L37.0775 6.59155C37.1264 9.28099 37.1468 9.39818 37.6032 9.60618C38.009 9.79101 38.4432 9.72583 38.7324 9.43663L39 9.16903V6.6636C39 4.7092 38.9691 4.0398 38.8598 3.62004C38.4281 1.96236 37.0376 0.571908 35.38 0.140162C34.9602 0.0308519 34.2908 0 32.3364 0H29.831L29.5634 0.267599ZM7.18461 6.03044C6.7145 6.24403 6.24403 6.7145 6.03044 7.18461C5.88424 7.5064 5.86291 7.81703 5.86117 9.64783C5.85989 10.9789 5.89788 11.8722 5.96544 12.0975C6.10295 12.5566 6.60235 13.1357 7.08198 13.3922C7.44451 13.5861 7.56225 13.5951 9.75 13.5951H12.0387L12.4774 13.3372C12.9821 13.0405 13.4151 12.4913 13.5557 11.9693C13.6155 11.7473 13.6419 10.8072 13.6241 9.53449C13.5912 7.1858 13.5458 7.00782 12.8207 6.38721C12.2575 5.90511 11.9789 5.85897 9.64783 5.86117C7.81703 5.86291 7.5064 5.88424 7.18461 6.03044ZM15.9943 6.04372C15.6445 6.31882 15.5218 6.77254 15.689 7.1727C15.9323 7.75514 16.0724 7.78169 18.9004 7.78169H21.4225V9.30132C21.4225 11.0267 21.5017 11.33 22.0156 11.5739C22.3939 11.7534 22.4653 11.7534 22.8436 11.5739C23.3842 11.3173 23.4366 11.0717 23.4366 8.79487C23.4366 6.61901 23.3828 6.29887 22.9682 6.00847C22.7808 5.87719 22.3605 5.85915 19.4919 5.85915C16.3591 5.85915 16.2195 5.86648 15.9943 6.04372ZM26.8365 5.98449C26.3965 6.14369 25.8477 6.63311 25.6095 7.0785C25.4134 7.44543 25.4049 7.5562 25.4049 9.75V12.0387L25.6628 12.4774C25.9595 12.9821 26.5087 13.4151 27.0307 13.5557C27.2527 13.6155 28.1928 13.6419 29.4655 13.6241C31.8142 13.5912 31.9922 13.5458 32.6128 12.8207C33.0949 12.2575 33.141 11.9789 33.1388 9.64783C33.1366 7.31039 33.0952 7.10935 32.4929 6.50705C31.8862 5.90035 31.6973 5.86263 29.2958 5.86813C27.8472 5.87142 27.0438 5.90951 26.8365 5.98449ZM11.6236 7.95875C11.6788 8.06201 11.7183 8.8227 11.7183 9.78323C11.7183 11.1588 11.6946 11.4543 11.5745 11.5745C11.4543 11.6946 11.1588 11.7183 9.78323 11.7183C8.8227 11.7183 8.06201 11.6788 7.95875 11.6236C7.79313 11.5348 7.78169 11.4151 7.78169 9.7651C7.78169 8.51537 7.81373 7.96937 7.89155 7.89155C7.96937 7.81373 8.51537 7.78169 9.76511 7.78169C11.4151 7.78169 11.5348 7.79313 11.6236 7.95875ZM31.1084 7.89155C31.1863 7.96937 31.2183 8.51537 31.2183 9.7651C31.2183 11.4151 31.2069 11.5348 31.0413 11.6236C30.938 11.6788 30.1773 11.7183 29.2168 11.7183C27.8412 11.7183 27.5457 11.6946 27.4255 11.5745C27.3054 11.4543 27.2817 11.1588 27.2817 9.78323C27.2817 8.8227 27.3212 8.06201 27.3764 7.95875C27.4652 7.79313 27.5849 7.78169 29.2349 7.78169C30.4846 7.78169 31.0306 7.81373 31.1084 7.89155ZM16.1421 9.85189C15.875 9.98363 15.5634 10.4464 15.5634 10.7113C15.5634 10.9853 15.8768 11.4412 16.1564 11.5739C16.5634 11.767 18.4503 11.7768 18.9018 11.5882C19.2238 11.4536 19.5 11.0488 19.5 10.7113C19.5 10.3737 19.2238 9.96889 18.9018 9.83432C18.452 9.64637 16.534 9.65863 16.1421 9.85189ZM16.0534 13.8172C15.659 14.0578 15.5084 14.5221 15.6865 14.9485C15.9285 15.5277 16.0555 15.5634 17.8725 15.5634H19.5V16.5704V17.5775H18.8063C18.1617 17.5775 18.0937 17.5964 17.8451 17.8451C17.4096 18.2806 17.5046 19.0347 18.0343 19.3476C18.4074 19.568 22.4756 19.5755 22.899 19.3566C23.2777 19.1608 23.4791 18.6701 23.3462 18.2673C23.1793 17.7618 22.952 17.6286 22.1686 17.5775L21.4683 17.5317V16.5704V15.6092L22.1686 15.5634C22.952 15.5122 23.1793 15.379 23.3462 14.8736C23.4237 14.6385 23.416 14.5011 23.311 14.2498C23.0613 13.652 22.9905 13.6408 19.4817 13.6412C16.5473 13.6415 16.3227 13.653 16.0534 13.8172ZM6.44306 15.6949C5.91884 15.9231 5.85915 16.1077 5.85915 17.5019C5.85915 18.2332 5.90191 18.8529 5.96151 18.9836C6.21391 19.5377 7.07292 19.6414 7.51528 19.1711C7.72291 18.9503 7.73766 18.8618 7.76558 17.6705C7.79963 16.2153 7.71092 15.9138 7.18351 15.6935C6.81026 15.5376 6.80468 15.5376 6.44306 15.6949ZM10.2829 15.711C10.0159 15.8428 9.70422 16.3056 9.70422 16.5704C9.70422 16.6308 9.76922 16.817 9.8486 16.9844C10.0388 17.3852 10.4639 17.5775 11.16 17.5775H11.7183V18.1682C11.7183 19.3402 11.9489 19.5 13.6408 19.5C14.6032 19.5 14.9009 19.4691 15.1065 19.3476C15.6363 19.0347 15.7313 18.2806 15.2958 17.8451C15.0471 17.5964 14.9791 17.5775 14.3345 17.5775H13.6408V16.9778C13.6408 16.2457 13.4661 15.8704 13.0427 15.6935C12.5929 15.5055 10.6748 15.5178 10.2829 15.711ZM25.9373 15.6974C25.4004 15.9309 25.3592 16.134 25.3592 18.5429C25.3592 20.3983 25.3809 20.7445 25.5116 20.9657C25.8245 21.4954 26.5786 21.5904 27.0141 21.1549L27.2817 20.8873V18.5661C27.2817 15.9901 27.271 15.9389 26.6776 15.691C26.3102 15.5375 26.3048 15.5376 25.9373 15.6974ZM31.7964 15.6974C31.3918 15.8734 31.2183 16.2577 31.2183 16.9778V17.5775H30.5246C29.88 17.5775 29.812 17.5964 29.5634 17.8451C29.3686 18.0398 29.2958 18.2007 29.2958 18.4358C29.2958 19.1836 29.6878 19.5 30.6144 19.5H31.2183V20.1039C31.2183 21.0305 31.5347 21.4225 32.2825 21.4225C32.5176 21.4225 32.6785 21.3497 32.8732 21.1549L33.1408 20.8873V18.5661C33.1408 15.9901 33.1301 15.9389 32.5367 15.691C32.1693 15.5375 32.1639 15.5376 31.7964 15.6974ZM6.44306 21.5541C6.06651 21.718 5.85915 22.0289 5.85915 22.4296C5.85915 22.8383 6.06953 23.1445 6.46329 23.309C6.93184 23.5047 10.7059 23.4912 11.1253 23.2922C11.4048 23.1595 11.7183 22.7036 11.7183 22.4296C11.7183 22.1556 11.4048 21.6997 11.1253 21.5669C10.7121 21.3709 6.88808 21.3604 6.44306 21.5541ZM14.219 21.5566C13.9139 21.6892 13.6408 22.1016 13.6408 22.4296C13.6408 22.7671 13.917 23.172 14.239 23.3065C14.6905 23.4951 16.5775 23.4853 16.9844 23.2922C17.264 23.1595 17.5775 22.7036 17.5775 22.4296C17.5775 22.1556 17.264 21.6997 16.9844 21.5669C16.5832 21.3766 14.6494 21.3693 14.219 21.5566ZM20.0781 21.5566C19.7731 21.6892 19.5 22.1016 19.5 22.4296C19.5 22.7671 19.7762 23.172 20.0982 23.3065C20.2695 23.378 20.6375 23.4366 20.9161 23.4366H21.4225V24.3979V25.3592H18.9004C16.0724 25.3592 15.9323 25.3857 15.689 25.9681C15.5218 26.3683 15.6445 26.822 15.9943 27.0971C16.2195 27.2744 16.3591 27.2817 19.4919 27.2817C22.3605 27.2817 22.7808 27.2637 22.9682 27.1324C23.3828 26.842 23.4366 26.5218 23.4366 24.346C23.4366 22.0691 23.3842 21.8235 22.8436 21.5669C22.4424 21.3766 20.5086 21.3693 20.0781 21.5566ZM25.8553 23.5414C25.4492 23.7385 25.3592 24.0683 25.3592 25.3592C25.3592 26.6712 25.4491 26.9851 25.8821 27.1824C26.1782 27.3172 30.3993 27.3172 30.6954 27.1824C31.0532 27.0193 31.2183 26.6343 31.2183 25.963V25.3592H31.8222C32.7488 25.3592 33.1408 25.0428 33.1408 24.295C33.1408 24.0599 33.068 23.8989 32.8732 23.7042L32.6056 23.4366H31.2183H29.831L29.5634 23.7042C29.3147 23.9529 29.2958 24.0209 29.2958 24.6655V25.3592H28.2887H27.2817V24.6655C27.2817 24.0209 27.2627 23.9529 27.0141 23.7042C26.7286 23.4188 26.2475 23.3511 25.8553 23.5414ZM7.50649 25.4447C6.79845 25.6601 6.15541 26.2684 5.96544 26.9025C5.89788 27.1278 5.85989 28.0211 5.86117 29.3522C5.86337 31.6896 5.90475 31.8906 6.50705 32.493C7.10935 33.0953 7.31039 33.1366 9.64783 33.1388C10.9789 33.1401 11.8722 33.1021 12.0975 33.0346C12.5566 32.897 13.1357 32.3976 13.3922 31.918C13.5861 31.5555 13.5951 31.4378 13.5951 29.25V26.9613L13.3413 26.5295C13.0546 26.0418 12.6139 25.6705 12.1076 25.4898C11.7277 25.3542 7.92634 25.3169 7.50649 25.4447ZM11.5745 27.4255C11.6946 27.5457 11.7183 27.8412 11.7183 29.2168C11.7183 30.1773 11.6788 30.938 11.6236 31.0413C11.5348 31.2069 11.4151 31.2183 9.76511 31.2183C8.51537 31.2183 7.96937 31.1863 7.89155 31.1084C7.81373 31.0306 7.78169 30.4849 7.78169 29.2363C7.78169 27.6544 7.79808 27.4643 7.9419 27.3806C8.03427 27.3268 8.80713 27.2861 9.76639 27.2844C11.1598 27.2821 11.454 27.3051 11.5745 27.4255ZM0.267599 29.5634L0 29.831V32.3364C0 34.2908 0.0308526 34.9602 0.140162 35.38C0.571909 37.0376 1.96236 38.4281 3.62004 38.8598C4.03979 38.9691 4.7092 39 6.6636 39H9.16903L9.43663 38.7324C9.88659 38.2824 9.74258 37.407 9.18212 37.1849C9.02401 37.1222 7.99775 37.0735 6.5 37.0576L4.07394 37.0317L3.49489 36.7178C2.86833 36.378 2.49801 35.9912 2.17658 35.3409C1.98351 34.9502 1.96877 34.7796 1.92418 32.4085C1.87356 29.7196 1.85296 29.6016 1.39677 29.3938C0.99102 29.209 0.556803 29.2742 0.267599 29.5634ZM16.0318 29.4451C15.674 29.6957 15.5634 30.1144 15.5634 31.2183C15.5634 32.6589 15.8158 33.1408 16.5704 33.1408C17.2164 33.1408 17.5775 32.6331 17.5775 31.7248V31.2183H19.1426C20.4385 31.2183 20.752 31.1921 20.9657 31.0659C21.4954 30.753 21.5904 29.9989 21.1549 29.5634L20.8873 29.2958H18.5661C16.5684 29.2958 16.2153 29.3166 16.0318 29.4451ZM23.7042 29.5634L23.4366 29.831V31.2183V32.6056L23.7042 32.8732L23.9718 33.1408H28.2887H32.6056L32.8732 32.8732L33.1408 32.6056V31.2183V29.831L32.8732 29.5634C32.6785 29.3686 32.5176 29.2958 32.2825 29.2958C31.5347 29.2958 31.2183 29.6878 31.2183 30.6144V31.2183H30.257H29.2958V30.7119C29.2958 29.8035 28.9347 29.2958 28.2887 29.2958C27.6428 29.2958 27.2817 29.8035 27.2817 30.7119V31.2183H26.3204H25.3592V30.6144C25.3592 29.6878 25.0428 29.2958 24.295 29.2958C24.0599 29.2958 23.8989 29.3686 23.7042 29.5634ZM37.5765 29.3993C37.1491 29.607 37.1259 29.7473 37.0775 32.4085L37.0317 34.9261L36.7189 35.5029C36.3713 36.144 36.0857 36.4202 35.3936 36.7843C34.9267 37.03 34.9227 37.0305 32.4085 37.0768C29.7193 37.1264 29.6017 37.1469 29.3938 37.6032C29.209 38.009 29.2742 38.4432 29.5634 38.7324L29.831 39H32.3364C34.2908 39 34.9602 38.9691 35.38 38.8598C37.0376 38.4281 38.4281 37.0376 38.8598 35.38C38.9691 34.9602 39 34.2908 39 32.3364V29.831L38.7324 29.5634C38.5261 29.3571 38.3845 29.2972 38.1144 29.302C37.9217 29.3054 37.6797 29.3491 37.5765 29.3993Z"
          fill={color}
        />
      </svg>
    </>
  );
}
