import { timeParse, dsvFormat } from "d3";

const tsv = `date revenue
20210101 224894
20210102 196928
20210103 528492
20210104 363578
20210105 533236
20210106 625356
20210107 378434
20210108 105819
20210109 140155
20210110 384035
20210111 551516
20210112 118979
20210113 481762
20210114 354572
20210115 362960
20210116 613443
20210117 209025
20210118 675631
20210119 434648
20210120 689392
20210121 507229
20210122 121316
20210123 614784
20210124 125430
20210125 374414
20210126 119992
20210127 674790
20210128 482563
20210129 219984
20210130 416781
20210131 399465
20210201 464659
20210202 420741
20210203 315822
20210204 135603
20210205 490933
20210206 118159
20210207 456232
20210208 586750
20210209 398001
20210210 413498
20210211 532011
20210212 645579
20210213 153922
20210214 331030
20210215 680007
20210216 334272
20210217 179781
20210218 438721
20210219 442803
20210220 106936
20210221 256876
20210222 594742
20210223 160257
20210224 305593
20210225 103131
20210226 137390
20210227 228204
20210228 338826
20210301 206444
20210302 175245
20210303 578472
20210304 651329
20210305 571068
20210306 399888
20210307 187651
20210308 288342
20210309 252065
20210310 555121
20210311 140048
20210312 408748
20210313 347050
20210314 310986
20210315 140930
20210316 575506
20210317 244874
20210318 381496
20210319 257414
20210320 552850
20210321 271621
20210322 109197
20210323 677377
20210324 617308
20210325 307770
20210326 318798
20210327 649815
20210328 232876
20210329 275528
20210330 386065
20210331 178804
20210401 133731
20210402 347418
20210403 609184
20210404 529686
20210405 423879
20210406 204021
20210407 165823
20210408 377707
20210409 363754
20210410 447852
20210411 401314
20210412 428496
20210413 583589
20210414 664162
20210415 655662
20210416 210707
20210417 608158
20210418 636775
20210419 634105
20210420 343837
20210421 326080
20210422 546465
20210423 434579
20210424 204725
20210425 540412
20210426 414393
20210427 433488
20210428 262105
20210429 495470
20210430 313701
20210501 217544
20210502 457352
20210503 192012
20210504 538712
20210505 650653
20210506 363516
20210507 300180
20210508 366987
20210509 669444
20210510 599325
20210511 529804
20210512 596711
20210513 654454
20210514 497216
20210515 177753
20210516 623657
20210517 310423
20210518 542352
20210519 349553
20210520 352090
20210521 294387
20210522 344683
20210523 424084
20210524 536947
20210525 510221
20210526 371661
20210527 256724
20210528 373277
20210529 648293
20210530 163817
20210531 222451
20210601 622301
20210602 924417
20210603 453689
20210604 563898
20210605 709664
20210606 657690
20210607 706150
20210608 898968
20210609 505253
20210610 664592
20210611 585968
20210612 931854
20210613 925567
20210614 880468
20210615 521080
20210616 768714
20210617 415234
20210618 810852
20210619 699061
20210620 891721
20210621 979559
20210622 529097
20210623 721335
20210624 670726
20210625 632512
20210626 888104
20210627 997750
20210628 808228
20210629 516298
20210630 462343
20210701 466341
20210702 563439
20210703 854140
20210704 524386
20210705 448170
20210706 673845
20210707 604665
20210708 600387
20210709 723961
20210710 643526
20210711 768150
20210712 682022
20210713 946861
20210714 666289
20210715 835199
20210716 795187
20210717 920115
20210718 741592
20210719 885795
20210720 719577
20210721 698048
20210722 709065
20210723 949953
20210724 829310
20210725 868046
20210726 925762
20210727 478645
20210728 488842
20210729 748643
20210730 802659
20210731 924553
20210801 737041
20210802 839790
20210803 914223
20210804 638049
20210805 539886
20210806 542931
20210807 677660
20210808 418204
20210809 714857
20210810 822149
20210811 461574
20210812 955035
20210813 551863
20210814 647935
20210815 686826
20210816 956263
20210817 719211
20210818 664980
20210819 590752
20210820 654517
20210821 661888
20210822 935031
20210823 638605
20210824 855268
20210825 563628
20210826 958743
20210827 954996
20210828 469820
20210829 900129
20210830 540112
20210831 457269
20210901 985838
20210902 831019
20210903 953299
20210904 666847
20210905 954901
20210906 997822
20210907 437251
20210908 578226
20210909 632639
20210910 629235
20210911 670108
20210912 912438
20210913 695277
20210914 619057
20210915 516530
20210916 527990
20210917 627556
20210918 820136
20210919 657316
20210920 949712
20210921 909481
20210922 548507
20210923 503335
20210924 767407
20210925 559273
20210926 451141
20210927 772609
20210928 966853
20210929 761094
20210930 437489`;

const data = dsvFormat(" ").parse(tsv, (d) => {
	return {
		date: timeParse("%Y%m%d")(d.date),
		revenue: d.revenue,
	};
});

export default data;
